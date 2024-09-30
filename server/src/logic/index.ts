import { JWT_SECRET } from "../const/env";
import { LoginData } from "../interfaces";
import { IUser, UserModel } from "../schema/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function addUserToDataBase(user: IUser) {
    const foundUserByUserName = await findUserByUserName(user.userName);
    if (foundUserByUserName) {
        throw new Error("User with this username already exists");
    }

    const foundUserByEmail = await findUserByEmail(user.email);
    if (foundUserByEmail) {
        throw new Error("User with this email already exists");
    }
    user.userName = user.userName.toLowerCase();
    user.email = user.email.toLowerCase();
    await UserModel.create(user);
}

export async function findUserByUserName(userName: string) {

    const user = await UserModel.findOne({ userName: userName.toLowerCase() });

    if (!user) {
        return null;
    }
    return user;

}

export async function findUserByEmail(email: string) {

    const user = await UserModel.findOne({ email: email.toLowerCase() });

    if (!user) {
        return null;
    }

    return user;
}


export async function getLoginTokenByUsernameValidation(

    userName: string,
    password: string
) {
    // Find user by username
    const foundUserByUserName = await findUserByUserName(userName);
    if (!foundUserByUserName) {
        throw new Error("User not found");
    }

    // Check password
    const passwordMatch: boolean = await bcrypt.compare(
        password,
        foundUserByUserName.hashedPassword
    );

    if (!passwordMatch) {
        throw new Error("Wrong password");
    }

    // Create object to sign
    const objectToSign: LoginData = {
        id: foundUserByUserName._id.toString(),
        userName: foundUserByUserName.userName,
        email: foundUserByUserName.email,
    };

    // Generate JWT token
    const token: string = jwt.sign(objectToSign, JWT_SECRET, {
        expiresIn: "24h",
    });

    const userToReturn = {
        userName: foundUserByUserName.userName,
        email: foundUserByUserName.email,
        nickname: foundUserByUserName.nickname,
    }
    return { token, user: userToReturn };
}

export async function getLoginTokenByEmailValidation(
    email: string,
    password: string
) {
    // Find user by email and explicitly include hashedPassword for validation
    const foundUserByEmail = await UserModel.findOne({ email })
        .select('+hashedPassword')
        .exec();

    if (!foundUserByEmail) {
        throw new Error("User not found");
    }

    // Check password using bcrypt in backend
    const passwordMatch: boolean = await bcrypt.compare(
        password,
        foundUserByEmail.hashedPassword
    );

    if (!passwordMatch) {
        throw new Error("Wrong password");
    }

    // Create object to sign for the JWT
    const objectToSign: LoginData = {
        id: foundUserByEmail._id.toString(), // Convert ObjectId to string
        userName: foundUserByEmail.userName,
        email: foundUserByEmail.email,
    };


    // Generate JWT token
    const token: string = jwt.sign(objectToSign, JWT_SECRET, {
        expiresIn: "24h",
    });

    // Return user data without the hashedPassword
    const userToReturn = {
        userName: foundUserByEmail.userName,
        email: foundUserByEmail.email,
        nickname: foundUserByEmail.nickname,
    };

    return { token, user: userToReturn };
}
