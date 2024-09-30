import mongoose, { Schema, Document } from 'mongoose';

export interface IUser {
    userName: string;
    hashedPassword: string;
    email: string;
    nickname: string;
}

export interface IUserDocument extends IUser, Document { }

const UserSchema: Schema = new Schema({
    userName: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true, select: false }, // Exclude hashedPassword
    email: { type: String, required: true, unique: true },
    nickname: { type: String, default: 'Unnamed' },
});


export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);
