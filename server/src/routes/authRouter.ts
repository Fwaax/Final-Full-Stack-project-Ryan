// routes.ts
import express, { Request, Response, Router } from "express";
import { getLoginTokenByEmailValidation, getLoginTokenByUsernameValidation } from "../logic";

const authRouter: Router = express.Router();

/**
 * Login
 * Request should be a POST request with the following body:
 * - name: string
 * - password: string
 * e.g. {
 *  "name": "John",
 *  "password": "password"
 *  }
 */
authRouter.post("/by-email", async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Missing name or password");
        }

        const loginTokenAndUser = await getLoginTokenByEmailValidation(email, password);



        res.json({ token: loginTokenAndUser.token, user: loginTokenAndUser.user });
    } catch (error) {
        res.status(500).send(error);
    }

});


authRouter.post("/by-username", async (req: Request, res: Response) => {

    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(400).send("Missing name or password");
        }

        const loginTokenAndUser = await getLoginTokenByUsernameValidation(userName, password);



        res.json({ token: loginTokenAndUser.token, user: loginTokenAndUser.user });
    } catch (error) {
        res.status(500).send(error);
    }

});

export default authRouter;