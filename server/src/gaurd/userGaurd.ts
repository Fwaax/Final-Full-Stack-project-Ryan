import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../const/env";
import dotenv from 'dotenv';

dotenv.config();

// userGaurd  checks for the token in the request header and verifies it.
// Then it checks the user in the request body and compares it with the user in the token.
// export const userGaurd = async (req: any, res: any, next: any) => {
//     try {
//         // const token = req.headers.authorization?.split(' ')[1];
//         const token = req.headers.authorization;
//         if (!token) {
//             return res.status(401).send("Unauthorized, token not found");
//         }
//         const decoded = jwt.verify(token, JWT_SECRET);
//         if (!decoded) {
//             return res.status(401).send("Unauthorized, invalid token");
//         }
//         console.log(`decoded JWT`, decoded);

//         req.jwtDecodedUser = decoded;
//         next();
//     } catch (error) {
//         console.error(error);
//         return res.status(401).send("Unauthorized");
//     }
// };

export const userGaurd = async (req: any, res: any, next: any) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send("Unauthorized, token not found");
        }

        // Extract the token, removing "Bearer " if present
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

        req.jwtDecodedUser = decoded; // Attach decoded user info to the request
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).send("Unauthorized, token verification failed");
    }
};



// Get one user
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
