import { TokenTypeEnum } from "../common/enums/index.js";
import { BadRequestException, decodeToken, ForbiddenException } from "../common/utils/index.js";
import { login } from "../modules/auth/auth.service.js";

export const authentication = (tokenType = TokenTypeEnum.Access) => {
    return async (req, res, next) => {
        const { authorization } = req.headers;
        const [schema, credentials] = authorization.split(" ")
        console.log({ authorization, schema, credentials });

        switch (schema) {
            case "Basic":
                const [email, password] = Buffer.from(credentials, 'base64')?.toString()?.split(":") || [];
                await login({ email, password }, `${req.protocol}://${req.host}`)
                console.log(data);
                break;
            case 'Bearer':
                req.user = await decodeToken({ token: credentials, tokenType })
                break;
            default:
                throw BadRequestException({ message: "missing authentication schema" })
                break;
        }
        next()
    }
}

export const authorization = (accessRoles = []) => {
    return async (req, res, next) => {
        if(!accessRoles.includes(req.user.role)){
            throw ForbiddenException({message: "Not authorized account"})
        }
        next()
    }
}