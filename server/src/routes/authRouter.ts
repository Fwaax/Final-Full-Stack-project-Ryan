// routes.ts
import express, { Request, Response, Router } from "express";
import { getLoginTokenAndUser } from "../logic";

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
authRouter.post("/login", async (req: Request, res: Response) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(400).send("Missing name or password");
    }

    const loginTokenAndUser = await getLoginTokenAndUser(userName, password);



    res.json({ token: loginTokenAndUser.token, user: loginTokenAndUser.user });
});

export default authRouter;
