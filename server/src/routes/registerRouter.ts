import express, { Request, Response, Router } from "express";
import COUNTRIES from "../const/countries";
import { IUser } from "../schema";
import { hashPassword } from "../utils";
import { addUserToDataBase } from "../logic";

const registerRouter: Router = express.Router();

/**
 * Register a new user
 * Request should be a POST request with the following body:
 * - name: string
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
registerRouter.post("/register", async (req: Request, res: Response) => {
    const { userName, nickname, email, password } = req.body;

    const userToAdd: IUser = {
        userName,
        nickname,
        email,
        hashedPassword: hashPassword(password),
    };

    await addUserToDataBase(userToAdd);


    res.send("User registered successfully.");
});

export default registerRouter;
