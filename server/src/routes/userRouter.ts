// routes.ts
import express, { Request, Response, Router } from "express";
import { UserModel } from "../schema/user";
import { userGaurd } from "../gaurd/userGaurd";
import { AuthorizedRequest } from "../interfaces";

const usersRouter: Router = express.Router();

// Search all users that are in the database
usersRouter.get("/", userGaurd, async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        if (users.length === 0) {
            return res.status(404).send({ message: "No users found." });
        }
        res.status(200).send({ message: "Users fetched successfully.", data: users });
    } catch (error) {
        res.status(500).send({ message: "Error fetching users.", error });
    }
});

// Get one user
usersRouter.get("/:id", userGaurd, async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }
        res.status(200).send({ message: "User fetched successfully.", data: user });
    } catch (error) {
        res.status(500).send({ message: "Error fetching user.", error });
    }
});

// Delete one user
usersRouter.delete("/delete", userGaurd, async (req: AuthorizedRequest, res: Response) => {
    try {
        const requesterId = req.jwtDecodedUser.id;
        const deletedUser = await UserModel.findByIdAndDelete(requesterId);
        if (!deletedUser) {
            return res.status(404).send({ message: "User not found or already deleted." });
        }
        res.status(200).send({ message: "User deleted successfully.", data: deletedUser });
    } catch (error) {
        res.status(500).send({ message: "Error deleting user.", error });
    }
});

// Update one user
usersRouter.put("/update", userGaurd, async (req: AuthorizedRequest, res: Response) => {
    try {
        const requesterId = req.jwtDecodedUser.id;
        const updatedUser = await UserModel.findByIdAndUpdate(requesterId, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).send({ message: "User not found." });
        }
        res.status(200).send({ message: "User updated successfully.", data: updatedUser });
    } catch (error) {
        res.status(500).send({ message: "Error updating user.", error });
    }
});

export default usersRouter;