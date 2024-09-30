
import { Request } from "express";
export interface LoginData {
    id: string;
    userName: string;
    email: string;
}


// Extend the Request interface to include requesterUser
export interface AuthorizedRequest extends Request {
    jwtDecodedUser: LoginData;
}
