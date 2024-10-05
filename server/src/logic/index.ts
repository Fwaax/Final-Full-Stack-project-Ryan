import { JWT_SECRET } from "../const/env";
import { DataContainedInToken } from "../interfaces";
import { IUser, UserModel } from "../schema/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function addUserToDataBase(user: IUser) {
    const foundUserByEmail = await findUserByEmail(user.email);
    if (foundUserByEmail) {
        throw new Error("User with this email already exists");
    }
    user.email = user.email.toLowerCase();
    await UserModel.create(user);
}

export async function findUserByEmail(email: string) {
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) {
        return null;
    }
    return user;
}

export async function findUserById(id: string) {
    const user = await UserModel.findOne({ id: id });
    if (!user) {
        return null;
    }
    return user;
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
    const objectToSign: DataContainedInToken = {
        id: foundUserByEmail._id.toString(), // Convert ObjectId to string
    };


    // Generate JWT token
    const token: string = jwt.sign(objectToSign, JWT_SECRET, {
        expiresIn: "24h",
    });

    // Return user data without the hashedPassword
    const userToReturn = {
        email: foundUserByEmail.email,
        nickname: foundUserByEmail.nickname,
    };

    return { token, user: userToReturn };
}
