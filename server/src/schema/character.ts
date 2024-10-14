import mongoose, { Schema, Document, Types } from 'mongoose';

export interface INewCharacterToSentFromFrontend {
    name: string;
    race: string;
    class: string;
    background: string;
    characteristics: string;
    personalityTraits: string;
    appearance: CharacterAppearance;
    organizations: string;
    allies: string;
    enemies: string;
    backstory: string;
    other: string;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
}

export interface Skill {
    name: string;
    mod: string;
    proficiency: boolean;
}

export type Gender = "male" | "female" | "";
export type Alignment = "Lawful Good" | "Neutral Good" | "Chaotic Good" | "Lawful Neutral" | "True Neutral" | "Chaotic Neutral" | "Lawful Evil" | "Neutral Evil" | "Chaotic Evil" | "";
export type Size = "Small" | "Medium" | "Large" | "";
export type Faith = "Torm" | "Tyr" | "Lathander" | "Mystra" | "Selûne" | "Sune" | "Tempus" | "Kelemvor" | "Bane" | "Bhaal" | "Shar" | "Lolth" | "Pelor" | "Heironeous" | "Rao" | "St. Cuthbert" | "Nerull" | "Vecna" | "Erythnul" | "Iuz" | "Arawai" | "Balinor" | "Boldrei" | "The Devourer" | "The Mockery" | "Nature" | "Philosophies" | "";
export type AbilityScore = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';

export interface CharacterAppearance {
    alignment: Alignment;
    gender: Gender;
    eyes: string;
    size: Size;
    height: string;
    faith: Faith;
    hair: string;
    skin: string;
    age: string;
    weight: string;
}

// Create a type for the ability score keys
// Define the TypeScript interface for a DnD character

// ICharacter on Backend side is the same as ICharacterApiResponse on frontend
export interface ICharacter {
    name: string;
    class: string;
    race: string;
    level: number;
    background: string;
    characteristics: string;
    personalityTraits: string;
    organizations: string;
    allies: string;
    enemies: string;
    backstory: string;
    other: string;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    appearance: CharacterAppearance;
    skills: Skill[];
    proficiencyBonus: number;
    hitPoints: {
        current: number;
        max: number;
        temp: number;
    };
    userId: Types.ObjectId;  // Reference to the UserModel
    createdAt?: Date;
    updatedAt?: Date;
}

// Extending the ICharacter interface with mongoose Document
export interface ICharacterDocument extends ICharacter, Document { }
const SkillSchema = new Schema({
    name: { type: String, required: true },
    mod: { type: String, required: true },
    proficiency: { type: Boolean, required: true }
})

const CharacterAppearanceSchema = new Schema({
    alignment: { type: String, required: true },
    gender: { type: String, required: true },
    eyes: { type: String, required: true },
    size: { type: String, required: true },
    height: { type: String, required: true },
    faith: { type: String, required: true },
    hair: { type: String, required: true },
    skin: { type: String, required: true },
    age: { type: String, required: true },
    weight: { type: String, required: true },
})

// Create the Mongoose schema
const CharacterSchema: Schema = new Schema({
    name: { type: String, required: true },
    class: { type: String, required: true },
    race: { type: String, required: true },
    level: { type: Number, required: true, default: 1 },
    background: { type: String, required: true },
    characteristics: { type: String, required: true },
    personalityTraits: { type: String, required: true },
    organizations: { type: String, required: false },
    allies: { type: String, required: false },
    enemies: { type: String, required: false },
    backstory: { type: String, required: true },
    other: { type: String, required: false },
    proficiencyBonus: { type: Number, required: true },
    strength: { type: Number, required: true },
    dexterity: { type: Number, required: true },
    constitution: { type: Number, required: true },
    intelligence: { type: Number, required: true },
    wisdom: { type: Number, required: true },
    charisma: { type: Number, required: true },
    appearance: CharacterAppearanceSchema,
    skills: [SkillSchema],
    hitPoints: {
        current: { type: Number, required: true },
        max: { type: Number, required: true },
        temp: { type: Number, required: false },
    },
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
