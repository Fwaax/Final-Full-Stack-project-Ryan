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

export type SkillKey = 'acrobatics' | 'animalHandling' | 'arcana' | 'athletics' | 'deception' | 'history' | 'insight' | 'intimidation' | 'investigation' | 'medicine' | 'nature' | 'perception' | 'performance' | 'persuasion' | 'religion' | 'sleightOfHand' | 'stealth' | 'survival';

export interface Skill {
    modifier: AttributeKey;
    proficiency: boolean;
}

export type Gender = "male" | "female" | "";
export type Alignment = "Lawful Good" | "Neutral Good" | "Chaotic Good" | "Lawful Neutral" | "True Neutral" | "Chaotic Neutral" | "Lawful Evil" | "Neutral Evil" | "Chaotic Evil" | "";
export type Size = "Small" | "Medium" | "Large" | "";
export type Faith = "Torm" | "Tyr" | "Lathander" | "Mystra" | "Selûne" | "Sune" | "Tempus" | "Kelemvor" | "Bane" | "Bhaal" | "Shar" | "Lolth" | "Pelor" | "Heironeous" | "Rao" | "St. Cuthbert" | "Nerull" | "Vecna" | "Erythnul" | "Iuz" | "Arawai" | "Balinor" | "Boldrei" | "The Devourer" | "The Mockery" | "Nature" | "Philosophies" | "";

export type AttributeKey = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';

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
    coreAttributes: Record<AttributeKey, number>;
    appearance: CharacterAppearance;
    skills: Record<SkillKey, Skill>;
    proficiencyBonus: number;
    hitPoints: {
        current: number;
        max: number;
        temp: number;
    };
    userId: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICharacterDocument extends ICharacter, Document { }

const SkillSchema = new Schema(
    {
        modifier: { type: String, required: true },
        proficiency: { type: Boolean, required: true },
    },
    { _id: false } // Disable _id field for skill schema
);

const CharacterAppearanceSchema = new Schema(
    {
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
    },
    { _id: false } // Disable _id for appearance schema
);

const CoreAttributesSchema = new Schema(
    {
        STR: { type: Number, required: true },
        DEX: { type: Number, required: true },
        CON: { type: Number, required: true },
        INT: { type: Number, required: true },
        WIS: { type: Number, required: true },
        CHA: { type: Number, required: true },
    },
    { _id: false } // Disable _id field for core attributes schema
);

const SkillsSchema = new Schema(
    Object.fromEntries(
        [
            'acrobatics', 'animalHandling', 'arcana', 'athletics', 'deception',
            'history', 'insight', 'intimidation', 'investigation', 'medicine',
            'nature', 'perception', 'performance', 'persuasion', 'religion',
            'sleightOfHand', 'stealth', 'survival',
        ].map((skill) => [skill, SkillSchema])
    ),
    { _id: false } // Disable _id for the entire skills schema
);

const CharacterSchema: Schema = new Schema({
    name: { type: String, required: true },
    class: { type: String, required: true },
    race: { type: String, required: true },
    level: { type: Number, required: true, default: 1 },
    background: { type: String, required: true },
    characteristics: { type: String, required: true },
    personalityTraits: { type: String, required: true },
    organizations: { type: String },
    allies: { type: String },
    enemies: { type: String },
    backstory: { type: String, required: true },
    other: { type: String },
    coreAttributes: CoreAttributesSchema,
    appearance: CharacterAppearanceSchema,
    skills: SkillsSchema,
    proficiencyBonus: { type: Number, required: true },
    hitPoints: {
        current: { type: Number, required: true },
        max: { type: Number, required: true },
        temp: { type: Number },
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const CharacterModel = mongoose.model<ICharacterDocument>('Character', CharacterSchema);

