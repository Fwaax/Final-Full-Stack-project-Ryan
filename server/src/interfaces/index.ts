
import { Request } from "express";
export interface DataContainedInToken {
    id: string;
}
export interface AuthorizedRequest extends Request {
    jwtDecodedUser: DataContainedInToken;
}
