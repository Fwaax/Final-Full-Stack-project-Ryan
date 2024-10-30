import mongoose, { Schema, Document } from 'mongoose';

export interface IUser {
    hashedPassword: string;
    email: string;
    nickquantity: 1, name: string;
}

export interface IUserDocument extends IUser, Document { }

const UserSchema: Schema = new Schema({
    hashedPassword: { type: String, required: true, select: false }, // Exclude hashedPassword
    email: { type: String, required: true, unique: true },
    nickquantity: 1, name: { type: String, default: 'Unnamed' },
});


export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);


