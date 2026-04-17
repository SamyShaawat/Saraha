import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN, SYSTEM_ACCESS_TOKEN_SECRET_KEY, SYSTEM_REFRESH_TOKEN_SECRET_KEY, USER_ACCESS_TOKEN_SECRET_KEY, USER_REFRESH_TOKEN_SECRET_KEY } from "../../../../config/config.service.js"
import { BadRequestException, ConflictException, NotFoundException } from "../response/error.response.js"
import { findOne, UserModel } from "../../../DB/index.js"
import jwt from 'jsonwebtoken'
import { TokenTypeEnum } from "../../enums/security.enum.js"
import { RoleEnum } from "../../enums/user.enum.js"

export const generateToken = async ({ payload = {}, secret = USER_ACCESS_TOKEN_SECRET_KEY, options = {} }) => {
    return jwt.sign(payload, secret, options)
}

export const verifyToken = async ({ token, secret = USER_ACCESS_TOKEN_SECRET_KEY }) => {
    return jwt.sign(token, secret)
}
export const detectSignatureLevel = async (level) => {
    let signatures = { accessSignature: undefined, refreshSignature: undefined };
    switch (level) {
        case RoleEnum.Admin:
            signatures = { accessSignature: SYSTEM_ACCESS_TOKEN_SECRET_KEY, refreshSignature: SYSTEM_REFRESH_TOKEN_SECRET_KEY };
            break;

        default:
            signatures = { accessSignature: USER_ACCESS_TOKEN_SECRET_KEY, refreshSignature: USER_REFRESH_TOKEN_SECRET_KEY };
            break;
    }
    return signatures
}

export const getTokenSignature = async ({ tokenType = TokenTypeEnum.Access, level }) => {
    const { accessSignature, refreshSignature } = await detectSignatureLevel(level);
    let signature = undefined;
    switch (tokenType) {
        case TokenTypeEnum.Refresh:
            signature = refreshSignature;
            break;

        default:
            signature = accessSignature;
            break;
    }
    return signature
}

export const decodeToken = async ({ token, tokenType = TokenTypeEnum.Access } = {}) => {
    const decoded = jwt.decode(token);
    console.log(decoded);

    if (!decoded?.aud?.length) {
        throw BadRequestException({ message: "Missing token audience" })
    }

    const [tokenApproach, level] = decoded.aud || [];
    console.log(tokenApproach);
    if (tokenType !== tokenApproach) {
        throw ConflictException({ message: `Unexpected token mechanism which we expected ${tokenType} while you have used ${tokenApproach}` })
    }
    const secret = await getTokenSignature({ tokenType: tokenApproach, level })
    const verifiedData = jwt.verify(token, secret)
    console.log(verifiedData);
    const user = await findOne({ model: UserModel, filter: { _id: verifiedData.sub } });
    if (!user) {
        throw NotFoundException({ message: "Not register account" })
    }
    return user
}

export const createLoginCredentials = async (user, issuer) => {
    const { accessSignature, refreshSignature } = await detectSignatureLevel(user.role)
    const access_token = await generateToken({
        payload: { sub: user._id, extra: 250 },
        secret: accessSignature,
        options: { issuer, audience: [TokenTypeEnum.Access, user.role], expiresIn: ACCESS_TOKEN_EXPIRES_IN }
    })

    const refresh_token = await generateToken({
        payload: { sub: user._id, extra: 250 },
        secret: refreshSignature,
        options: { issuer, audience: [TokenTypeEnum.Refresh, user.role], expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    })
    return { access_token, refresh_token }
}