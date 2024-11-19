import express, { Request, Response, Router } from "express";

import { UserModel } from "../schema/user";
import { findUserByEmail } from "../logic";
import { userGaurd } from "../gaurd/userGaurd";
import { AuthorizedRequest } from "../interfaces";
import { CharacterModel, ICharacterInDB, INewCharacterToSentFromFrontend } from "../schema/character";
import { editCharacterValidationJoi, newCharacterValidationJoi } from "../validation/characterValidationJoi";
import { log } from "node:console";
import mongoose from "mongoose";
import { initChar } from "../const/initChar";

const characterRouter: Router = express.Router();

characterRouter.get("/all-my-characters", userGaurd, async (req: AuthorizedRequest, res: Response) => {
    try {
        const requesterId = req.jwtDecodedUser.id;
        const foundCharacters = await CharacterModel.find({ userId: requesterId });
        res.status(200).send({
            message: "Characters fetched successfully.",
            data: foundCharacters || [],
        });
    } catch (error) {
        res.status(500).send({ message: "Failed to fetch characters.", error });
    }
});

characterRouter.get("/my-character/:id", userGaurd, async (req: Request, res: Response) => {
    try {
        const character = await CharacterModel.findById(req.params.id);
        if (!character) {
            return res.status(404).send({ message: "Character not found." });
        }
        res.status(200).send({ message: "Character fetched successfully.", data: character });
    } catch (error) {
        res.status(500).send(error);
    }
});
characterRouter.post("/new-character", userGaurd, async (req: AuthorizedRequest, res: Response) => {
    try {
        const requesterId = req.jwtDecodedUser.id;
        const validationResult = newCharacterValidationJoi.validate(req.body, { allowUnknown: false });
        if (validationResult.error) {
            return res.status(400).send(validationResult.error.details[0].message);
        }
        const foundUser = await UserModel.findById(requesterId);
        if (!foundUser) {
            return res.status(404).send({ message: "User not found." });
        }
        const charFromFrontend: INewCharacterToSentFromFrontend = req.body;
        const newCharacterWeAreStoringToDB: ICharacterInDB = initChar(charFromFrontend, requesterId);
        const savedCharacter = await CharacterModel.create(
            newCharacterWeAreStoringToDB
        );
        res.status(201).send({ message: "Character created successfully.", data: savedCharacter });
    } catch (error) {
        res.status(500).send({ message: "Error creating character.", error });
    }
});

characterRouter.delete("/delete-character", userGaurd, async (req: AuthorizedRequest, res: Response) => {
    try {
        const requesterId = req.jwtDecodedUser.id;
        if (!req.body.characterId) {
            return res.status(400).send({ message: "Character ID is required." });
        }
        const characterIdToDelete = req.body.characterId;
        const foundCharacter = await CharacterModel.findById(characterIdToDelete);
        if (!foundCharacter) {
            return res.status(404).send({ message: "Trying to delete a non-existent character." });
        }
        const characterOwnerId = foundCharacter.userId;
        if (characterOwnerId.toString() !== requesterId) {
            return res.status(403).send({ message: "You are not authorized to delete this character." });
        }
        await CharacterModel.findByIdAndDelete(characterIdToDelete);
        res.status(200).send({ message: "Character deleted successfully." });
    } catch (error) {
        res.status(500).send({ message: "Error deleting character.", error });
    }
});

characterRouter.put("/edit-character/:id", userGaurd, async (req: AuthorizedRequest, res: Response) => {
    try {
        const sentCharacterId = req.params.id;
        const requesterId = req.jwtDecodedUser.id;
        const validationResult = editCharacterValidationJoi.validate(req.body, { allowUnknown: true });
        if (validationResult.error) {
            return res.status(400).send({ message: `Validation error: ${validationResult.error.message}` });
        }
        const oldCharacterState = await CharacterModel.findById(sentCharacterId);
        if (!oldCharacterState) {
            return res.status(404).send({ message: "Trying to edit a non-existent character." });
        }
        if (oldCharacterState.userId.toString() !== requesterId) {
            return res.status(403).send({ message: "You are not authorized to edit this character." });
        }
        const updatedChar: ICharacterInDB = {
            ...req.body,
            updatedAt: new Date(),
            userId: oldCharacterState.userId,
            createdAt: oldCharacterState.createdAt,
            _id: oldCharacterState._id
        };

        const result = await CharacterModel.findByIdAndUpdate(sentCharacterId, updatedChar, { new: true });
        if (!result) {
            return res.status(404).send({ message: "Failed to update character." });
        }

        res.status(200).send({ message: "Character updated successfully.", data: result });
    } catch (error) {
        console.error("Error updating character:", error);
        res.status(500).send({ message: "Error updating character.", error });
    }
});


export default characterRouter