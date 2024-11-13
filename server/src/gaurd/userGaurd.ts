import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../const/env";
import dotenv from 'dotenv';

dotenv.config();

export const userGaurd = async (req: any, res: any, next: any) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send("Unauthorized, token not found");
        }
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;
        if (!token) {
            return res.status(401).send("Unauthorized, token missing after prefix removal");
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) {
            return res.status(401).send("Unauthorized, invalid token");
        }
        console.log(`decoded JWT`, decoded);
        req.jwtDecodedUser = decoded;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).send("Unauthorized, token verification failed");
    }
};

export const getUserGaurd = async (req: any, res: any, next: any) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).send("Unauthorized");
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        if (req.user = decoded) {
            next();
        }
    } catch (error) {
        console.error(error);
        return res.status(401).send("Unauthorized");
    }
};
