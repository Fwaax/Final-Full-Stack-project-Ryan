// routes.ts
import express, { Request, Response, Router } from "express";
import { UserModel } from "../schema/user";
import { userGaurd } from "../gaurd/userGaurd";
import { AuthorizedRequest } from "../interfaces";

const usersRouter: Router = express.Router();

// Search all users that are in the database
usersRouter.get("/", userGaurd, async (req: Request, res: Response) => {
    try {
        res.send(await UserModel.find());
    } catch (error) {
        res.status(500).send(error);
    }
});


// Get one user
usersRouter.get("/:id", userGaurd, async (req: Request, res: Response) => {
    try {
        res.send(await UserModel.findById(req.params.id));
    } catch (error) {
        res.status(500).send(error);
    }
});


// Delete one user
usersRouter.delete("/:id", userGaurd, async (req: AuthorizedRequest, res: Response) => {
    try {
        const requesterId = req.jwtDecodedUser.id;
        if (requesterId !== req.params.id) {
            return res.status(403).send("Unauthorized, you can only delete your own account");
        }
        res.send(await UserModel.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(500).send(error);
    }
});


// Update one user
usersRouter.put("/:id", userGaurd, async (req: Request, res: Response) => {
    try {
        res.send(await UserModel.findByIdAndUpdate(req.params.id, req.body));
    } catch (error) {
        res.status(500).send(error);
    }
});

export default usersRouter;
