import mongoose, { Schema, Document } from 'mongoose';

export interface IUser {
    hashedPassword: string;
    email: string;
    nickname: string;
}

export interface IUserDocument extends IUser, Document { }

const UserSchema: Schema = new Schema({
    hashedPassword: { type: String, required: true, select: false },
    email: { type: String, required: true, unique: true },
    nickname: { type: String, default: 'Unnamed' },
});


export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);


