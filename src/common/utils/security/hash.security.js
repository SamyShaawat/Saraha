import { compare, genSalt, hash } from "bcrypt";
import { SALT_ROUND } from "../../../../config/config.service.js";
import * as argon2 from 'argon2'
import { HashApproachEnum } from "../../enums/index.js";

export const generateHash = async ({ plainText, salt = SALT_ROUND, minor = 'b', approach = HashApproachEnum.bcrypt } = {}) => {
    let hashValue;
    switch (approach) {
        case HashApproachEnum.argon2:
            hashValue = await argon2.hash(plainText)
            break;

        default:
            const generateSalt = await genSalt(salt, minor)
            hashValue = await hash(plainText, generateSalt)

            break;
    }
    return hashValue;
}

export const compareHash = async ({ plainText, cipherText, approach = HashApproachEnum.bcrypt } = {}) => {
    let match = false;
    switch (approach) {
        case HashApproachEnum.argon2:
            match = await argon2.verify(cipherText, plainText)
            break;

        default:
            match = await compare(plainText, cipherText)
            break;
    }
    return match;
}