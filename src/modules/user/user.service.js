import { createLoginCredentials, decodeToken } from "../../common/utils/index.js";
import { TokenTypeEnum } from "../../common/enums/security.enum.js";

export const profile = async (user) => {
    return user
}

export const rotateToken = async (user, issuer) => {
    return createLoginCredentials(user, issuer);
}