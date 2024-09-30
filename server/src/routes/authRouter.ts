// routes.ts
import express, { Request, Response, Router } from "express";
import { getLoginTokenByEmailValidation, getLoginTokenByUsernameValidation } from "../logic";
import { EMAIL_REGEX, PASSWORD_REGEX, LoginValidationJoi } from "../validation/validationJoi";
import { UserModel } from "../schema/user";

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

// Added lines 25~38  but not 28~30 -------------------------------------------------------------
authRouter.post("/by-email", async (req: Request, res: Response) => {
    try {
        const validationResult = LoginValidationJoi.validate(req.body, { allowUnknown: false });
        if (validationResult.error) {
            return res.status(400).send(validationResult.error.details[0].message);
        }
        const { email, password } = req.body;

        if (!EMAIL_REGEX.test(email)) {
            return res.status(403).send("email or password is incorrect");
        }
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(403).send("email or password is incorrect");
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