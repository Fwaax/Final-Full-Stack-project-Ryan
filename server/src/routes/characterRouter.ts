import express, { Request, Response, Router } from "express";

import { UserModel } from "../schema/user";
// import { CharacterCreationData } from "../interfaces";
import { findUserByEmail } from "../logic";
import { CharacterCreationValidationJoi } from "../validation/validationJoi";
import { userGaurd } from "../gaurd/userGaurd";
import { AuthorizedRequest } from "../interfaces";

const characterRouter: Router = express.Router();

characterRouter.post("/create-character", async (req: Request, res: Response) => {
    try {
        const validationResult = CharacterCreationValidationJoi.validate(req.body, { allowUnknown: false });
        if (validationResult.error) {
            return res.status(400).send(validationResult.error.details[0].message);
        }
    } catch (error) {
        return res.status(500).send(error);
    }
});

characterRouter.get("/all-my-characters", userGaurd, async (req: AuthorizedRequest, res: Response) => {
    try {
        const requesterId = req.jwtDecodedUser.id;
        // to do: character model find
        res.send(await UserModel.findById(req.params.id));
    } catch (error) {
        res.status(500).send(error);
    }
});



export default characterRouter