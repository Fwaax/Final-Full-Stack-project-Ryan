import mongoose, { Schema, Document, Types } from 'mongoose';

// Define the TypeScript interface for a DnD character
export interface ICharacter {
    name: string;
    class: string;
    race: string;
    level: number;
    gender: string;
    eyes: string;
    hair: string;
    skin: string;
    height: string;
    age: string;
    weight: string;
    size: string;
    faith: string;
    characteristics: string;
    personalityTraits: string;
    organizations: string;
    allies: string;
    enemies: string;
    backstory: string;
    other: string;
    stats: {
        strength: number;
        dexterity: number;
        constitution: number;
        intelligence: number;
        wisdom: number;
        charisma: number;
    };
    hp: {
        current: number;
        max: number;
    };
    background: string;
    alignment: string;
    inventory: string[];
    spells?: string[]; // Optional, for spellcasters
    userId: Types.ObjectId;  // Reference to the UserModel
    createdAt?: Date;
    updatedAt?: Date;
}

// Extending the ICharacter interface with mongoose Document
export interface ICharacterDocument extends ICharacter, Document { }

// Create the Mongoose schema
const CharacterSchema: Schema = new Schema({
    name: { type: String, required: true },
    class: { type: String, required: true },
    race: { type: String, required: true },
    level: { type: Number, required: true },
    gender: { type: String, required: true },
    eyes: { type: String, required: true },
    hair: { type: String, required: true },
    skin: { type: String, required: true },
    height: { type: String, required: true },
    age: { type: String, required: true },
    weight: { type: String, required: true },
    size: { type: String, required: true },
    faith: { type: String, required: true },
    characteristics: { type: String, required: true },
    personalityTraits: { type: String, required: true },
    organizations: { type: String, required: false },
    allies: { type: String, required: false },
    enemies: { type: String, required: false },
    backstory: { type: String, required: true },
    other: { type: String, required: false },
    stats: {
        strength: { type: Number, required: true },
        dexterity: { type: Number, required: true },
        constitution: { type: Number, required: true },
        intelligence: { type: Number, required: true },
        wisdom: { type: Number, required: true },
        charisma: { type: Number, required: true },
    },
    hp: {
        current: { type: Number, required: true },
        max: { type: Number, required: true },
    },
    background: { type: String, required: true },
    alignment: { type: String, required: true },
    inventory: [{ type: String }],
    spells: [{ type: String }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',  // Reference to the UserModel
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Create the model from the schema
export const CharacterModel = mongoose.model<ICharacterDocument>('Character', CharacterSchema);
