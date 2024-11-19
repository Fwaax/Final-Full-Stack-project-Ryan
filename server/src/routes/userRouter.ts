import express, { Request, Response, Router } from "express";
import { UserModel } from "../schema/user";
import { userGaurd } from "../gaurd/userGaurd";
import { AuthorizedRequest } from "../interfaces";
import { hashPassword } from "../utils";
import bcrypt from "bcrypt";

const usersRouter: Router = express.Router();

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

usersRouter.put("/update", userGaurd, async (req: AuthorizedRequest, res: Response) => {
    try {
        const requesterId = req.jwtDecodedUser.id;
        console.log(`requesterId`, requesterId);
        console.log(`req.body`, req.body);

        const user = (await UserModel.findById(requesterId).select("+hashedPassword"));
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        const passwordMatch: boolean = await bcrypt.compare(
            req.body.currentPassword,
            user.hashedPassword
        );
        if (!passwordMatch) {
            return res.status(403).send({ message: "Current password is incorrect." });
        }
        const newHashedPassword = hashPassword(req.body.newPassword);
        user.hashedPassword = newHashedPassword;
        const updatedUser = await user.save();

        res.status(200).send({ message: "User updated successfully.", data: updatedUser });
    } catch (error) {
        res.status(500).send({ message: "Error updating user.", error });
    }
});

export default usersRouter;