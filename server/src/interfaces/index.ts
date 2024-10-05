
import { Request } from "express";
export interface DataContainedInToken {
    id: string;
}


// Extend the Request interface to include requesterUser
export interface AuthorizedRequest extends Request {
    jwtDecodedUser: DataContainedInToken;
}
