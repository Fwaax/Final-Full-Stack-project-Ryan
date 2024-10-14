import express, { Request, Response, Router } from "express";

import { UserModel } from "../schema/user";
// import { CharacterCreationData } from "../interfaces";
import { findUserByEmail } from "../logic";
import { userGaurd } from "../gaurd/userGaurd";
import { AuthorizedRequest } from "../interfaces";
import { CharacterModel, ICharacter, INewCharacterToSentFromFrontend } from "../schema/character";
import { newCharacterValidationJoi } from "../validation/characterValidationJoi";
import { log } from "node:console";
import mongoose from "mongoose";

const characterRouter: Router = express.Router();

characterRouter.get("/all-my-characters", userGaurd, async (req: AuthorizedRequest, res: Response) => {
    try {
        const requesterId = req.jwtDecodedUser.id;
        // to do: character model find
        const foundCharacters = await CharacterModel.find({ userId: requesterId });
        if (!foundCharacters || foundCharacters.length === 0) {
            return res.status(404).send({ message: "No characters found." });
        }

        res.status(200).send({ message: "Characters fetched successfully.", data: foundCharacters });
    } catch (error) {
        res.status(500).send(error);
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

// Import the CharacterModel at the top of your file

characterRouter.post("/new-character", userGaurd, async (req: AuthorizedRequest, res: Response) => {
    try {
        const requesterId = req.jwtDecodedUser.id;
        const validationResult = newCharacterValidationJoi.validate(req.body, { allowUnknown: false });
        if (validationResult.error) {
            console.log(`validationResult.error`);

            return res.status(400).send(validationResult.error.details[0].message);
        }
        const foundUser = await UserModel.findById(requesterId);
        if (!foundUser) {
            console.log(`foundUser`);

            return res.status(404).send({ message: "User not found." });
        }
        const charFromFrontend: INewCharacterToSentFromFrontend = req.body;
        // Directly create and save a new character using CharacterModel.create()
        const newCharacterWeAreStoringToDB: ICharacter = {
            ...charFromFrontend,
            level: 1,
            proficiencyBonus: 2,
            userId: new mongoose.Types.ObjectId(requesterId),
            hitPoints: {
                current: 0,
                max: 0,
                temp: 0
            },
            skills: [
                { name: "Acrobatics", mod: "DEX", proficiency: false },
                { name: "Animal Handling", mod: "WIS", proficiency: false },
                { name: "Arcana", mod: "INT", proficiency: false },
                { name: "Athletics", mod: "STR", proficiency: false },
                { name: "Deception", mod: "CHA", proficiency: false },
                { name: "History", mod: "INT", proficiency: false },
                { name: "Insight", mod: "WIS", proficiency: false },
                { name: "Intimidation", mod: "CHA", proficiency: false },
                { name: "Investigation", mod: "INT", proficiency: false },
                { name: "Medicine", mod: "WIS", proficiency: false },
                { name: "Nature", mod: "INT", proficiency: false },
                { name: "Perception", mod: "WIS", proficiency: false },
                { name: "Performance", mod: "CHA", proficiency: false },
                { name: "Persuasion", mod: "CHA", proficiency: false },
                { name: "Religion", mod: "INT", proficiency: false },
                { name: "Sleight of Hand", mod: "DEX", proficiency: false },
                { name: "Stealth", mod: "DEX", proficiency: false },
                { name: "Survival", mod: "WIS", proficiency: false },
            ]
        }

        const savedCharacter = await CharacterModel.create(
            newCharacterWeAreStoringToDB
        );

        // Respond with a success message and the saved character data
        res.status(201).send({ message: "Character created successfully.", data: savedCharacter });
    } catch (error) {
        // Return a 500 error with a message
        console.log(`error`, error);
        res.status(500).send({ message: "Error creating character.", error });

    }
});

characterRouter.delete("/delete-character", userGaurd, async (req: AuthorizedRequest, res: Response) => {
    try {
        console.log(`request the body`, req.body);
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

export default characterRouter