import express, { Request, Response, Router } from "express";
import { IUser } from "../schema/user";
import { hashPassword } from "../utils";
import { addUserToDataBase } from "../logic";
import { UserSignupValidationJoi, LoginValidationJoi } from "../validation/validationJoi";
import { error, log } from "console";

const registerRouter: Router = express.Router();

/**
 * Register a new user
 * Request should be a POST request with the following body:
 * - quantity:1,name: string
 * - date: Date
 * - country: string
 * - email: string
 * - password: string
 * e.g. {
 *   "name": "John",
 *   "date": "2020-01-01",
 *   "country": "USA",
 *   "email": "pCnXp@example.com",
 *   "password": "password"
 * }
 */

// Modiied line 30 no idea from where the error comes
registerRouter.post("/register", async (req: Request, res: Response) => {

    try {
        const validationResult = UserSignupValidationJoi.validate(req.body, { allowUnknown: false });
        if (validationResult.error) {
            return res.status(400).send(validationResult.error.details[0].message);
        }

        const { email, password, nickname } = req.body;


        const userToAdd: IUser = {
            nickname,
            email,
            hashedPassword: hashPassword(password),
        };

        await addUserToDataBase(userToAdd);


        res.send("User registered successfully.");
    } catch (error) {
        console.error(error);
        if (error.message) {
            return res.status(400).send(error.message);
        }
        res.status(500).send("Failed to register user.");
    }


});

export default registerRouter;
