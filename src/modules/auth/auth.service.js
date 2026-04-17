import { ProviderEnum } from "../../common/enums/index.js";
import { BadRequestException, compareHash, ConflictException, createLoginCredentials, encrypt, generateHash, NotFoundException } from "../../common/utils/index.js";
import { create, findOne, UserModel } from "../../DB/index.js";
import { OAuth2Client } from 'google-auth-library';

export const signup = async (inputs) => {
    const { username, email, password, phone } = inputs;

    const checkUserExist = await findOne({
        model: UserModel,
        filter: { email },
        options: { lean: true }
    });
    if (checkUserExist) {
        throw ConflictException({ message: "Email exist" });
    }
    // const salt = await genSalt(SALT_ROUND, 'a')  not used currently
    const user = await create({
        model: UserModel,
        data: {
            username,
            email,
            password: await generateHash({ plainText: password }),
            phone: encrypt(phone)
        }
    });
    return user
}

export const login = async (inputs, issuer) => {
    const { email, password } = inputs;

    const user = await findOne({
        model: UserModel,
        filter: { email, provider: ProviderEnum.System },
    });
    if (!user) {
        throw NotFoundException({ message: "Invalid login credentials " });
    }
    if (! await compareHash({ plainText: password, cipherText: user.password })) {
        throw NotFoundException({ message: "Invalid login credentials " });
    }
    return createLoginCredentials(user, issuer);
}


/*
{
  iss: 'https://accounts.google.com',
  azp: '466110454802-lg3qumtqeijm1u4s86vdrmhp7egsaeh9.apps.googleusercontent.com',
  aud: '466110454802-lg3qumtqeijm1u4s86vdrmhp7egsaeh9.apps.googleusercontent.com',
  sub: '109392006632074925525',
  email: 'shehabelsehelly@gmail.com',
  email_verified: true,
  nbf: 1775780416,
  name: 'Shehab Elsehelly',
  picture: 'https://lh3.googleusercontent.com/a/ACg8ocJTtsn9u_Kx36miWJyCe8b6q6G3BnNWq7kLU8uBoqXvF4M6h58E=s96-c',
  given_name: 'Shehab',
  family_name: 'Elsehelly',
  iat: 1775780716,
  exp: 1775784316,
  jti: '34deda9ec17a8a6d33e8709af690010d50e589fe'
}

 */
const verifyGoogleAccount = async (idToken) => {
    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
        idToken,
        audience: "466110454802-lg3qumtqeijm1u4s86vdrmhp7egsaeh9.apps.googleusercontent.com",
        // Specify the WEB_CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[WEB_CLIENT_ID_1, WEB_CLIENT_ID_2, WEB_CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    if (!payload?.email_verified) {
        throw BadRequestException({ message: "Fail to verify by google" })
    }
    return payload
}

export const loginWithGmail = async (idToken, issuer) => {
    const payload = await verifyGoogleAccount(idToken);
    console.log(payload);

    const user = await findOne({
        model: UserModel,
        filter: { email: payload.email, provider: ProviderEnum.Google }
    })
    if (!user) {
        throw NotFoundException({ message: "Not registered account" })
    }

    return await createLoginCredentials(user, issuer);
}

export const signupWithGmail = async (idToken, issuer) => {
    const payload = await verifyGoogleAccount(idToken);
    console.log(payload);

    const checkExist = await findOne({
        model: UserModel,
        filter: { email: payload.email }
    })
    if (checkExist) {
        if (checkExist.provider != ProviderEnum.Google) {
            throw ConflictException({ message: "Invalid login provider" })
        }
        return { status: 200, credentials: await loginWithGmail(idToken, issuer) };  //loginWithGmail
    }

    const user = await create({
        model: UserModel,
        data: {
            firstName: payload.given_name,
            lastName: payload.family_name,
            email: payload.email,
            profilePicture: payload.picture,
            confirmEmail: new Date(),
            provider: ProviderEnum.Google

        }
    })

    return { status: 201, credentials: await createLoginCredentials(user, issuer) };
}