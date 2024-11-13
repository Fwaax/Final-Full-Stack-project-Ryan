import mongoose, { Schema, Document, Types } from 'mongoose';
import Joi from 'joi';

export const SKILL_MODIFIER: { [key: string]: string } = {
    acrobatics: "DEX",
    animalHandling: "WIS",
    arcana: "INT",
    athletics: "STR",
    deception: "CHA",
    history: "INT",
    insight: "WIS",
    intimidation: "CHA",
    investigation: "INT",
    medicine: "WIS",
    nature: "INT",
    perception: "WIS",
    performance: "CHA",
    persuasion: "CHA",
    religion: "INT",
    sleightOfHand: "DEX",
    stealth: "DEX",
    survival: "WIS",
};

const attributeKeys = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'] as const;
const skillKeys = [
    'acrobatics', 'animalHandling', 'arcana', 'athletics', 'deception',
    'history', 'insight', 'intimidation', 'investigation', 'medicine',
    'nature', 'perception', 'performance', 'persuasion', 'religion',
    'sleightOfHand', 'stealth', 'survival',
] as const;
const alignmentValues = [
    "Lawful Good", "Neutral Good", "Chaotic Good",
    "Lawful Neutral", "True Neutral", "Chaotic Neutral",
    "Lawful Evil", "Neutral Evil", "Chaotic Evil", ""
] as const;
const sizeValues = ["Small", "Medium", "Large", ""] as const;
const genderValues = ["Male", "Female", ""] as const;
const faithValues = [
    "Torm", "Tyr", "Lathander", "Mystra", "Selûne", "Sune", "Tempus",
    "Kelemvor", "Bane", "Bhaal", "Shar", "Lolth", "Pelor", "Heironeous",
    "Rao", "St. Cuthbert", "Nerull", "Vecna", "Erythnul", "Iuz", "Arawai",
    "Balinor", "Boldrei", "The Devourer", "The Mockery", "Nature",
    "Philosophies", ""
] as const;
const appearanceSchema = Joi.object({
    alignment: Joi.string().valid(...alignmentValues).required(),
    gender: Joi.string().valid(...genderValues).required(),
    eyes: Joi.string().required(),
    size: Joi.string().valid(...sizeValues).required(),
    height: Joi.string().required(),
    faith: Joi.string().valid(...faithValues).required(),
    hair: Joi.string().required(),
    skin: Joi.string().required(),
    age: Joi.string().required(),
    weight: Joi.string().required(),
}).required();
const coreAttributesSchema = Joi.object(
    attributeKeys.reduce((acc, key) => ({ ...acc, [key]: Joi.number().required() }), {})
).required();
const skillSchema = Joi.object({
    modifier: Joi.string().valid(...attributeKeys).required(),
    proficiency: Joi.boolean().required(),
}).required();
const skillsSchema = Joi.object(
    skillKeys.reduce((acc, key) => ({ ...acc, [key]: skillSchema }), {})
).required();
const hitPointsSchema = Joi.object({
    max: Joi.number().integer().min(0).required(),
    current: Joi.number().integer().min(0).required(),
    temp: Joi.number().integer().min(0).optional(),
}).required();
export const newCharacterValidationJoi = Joi.object({
    name: Joi.string().min(1).required(),
    race: Joi.string().min(1).required(),
    class: Joi.string().min(1).required(),
    background: Joi.string().allow('').required(),
    characteristics: Joi.string().allow('').required(),
    personalityTraits: Joi.string().allow('').required(),
    appearance: appearanceSchema.required(),
    organizations: Joi.string().allow('').optional(),
    allies: Joi.string().allow('').optional(),
    enemies: Joi.string().allow('').optional(),
    backstory: Joi.string().allow('').required(),
    other: Joi.string().allow('').optional(),
    STR: Joi.number().integer().min(0).required(),
    DEX: Joi.number().integer().min(0).required(),
    CON: Joi.number().integer().min(0).required(),
    INT: Joi.number().integer().min(0).required(),
    WIS: Joi.number().integer().min(0).required(),
    CHA: Joi.number().integer().min(0).required(),
    firstSelectedSkill: Joi.string().valid(...skillKeys).required(),
    secondSelectedSkill: Joi.string().valid(...skillKeys).required(),
    thirdSelectedSkillHuman: Joi.string().valid(...skillKeys).required(),
    inventory: Joi.array().items(Joi.string()).optional(),
    spells: Joi.array().items(Joi.string()).optional(),
    firstSelectedCantrip: Joi.string().allow('').optional(),
    secondSelectedCantrip: Joi.string().allow('').optional(),
}).unknown(false);

export const editCharacterValidationJoi = Joi.object({
    name: Joi.string().min(1).optional(),
    race: Joi.string().min(1).optional(),
    class: Joi.string().min(1).optional(),
    level: Joi.number().integer().min(1).optional(),
    background: Joi.string().allow('').optional(),
    characteristics: Joi.string().allow('').optional(),
    personalityTraits: Joi.string().allow('').optional(),
    organizations: Joi.string().allow('').optional(),
    allies: Joi.string().allow('').optional(),
    enemies: Joi.string().allow('').optional(),
    backstory: Joi.string().allow('').optional(),
    other: Joi.string().allow('').optional(),
    appearance: appearanceSchema.optional(),
    coreAttributes: coreAttributesSchema.optional(),
    skills: skillsSchema.optional(),
    proficiencyBonus: Joi.number().integer().min(1).optional(),
    hitPoints: hitPointsSchema.optional(),

    inventory: Joi.array().items(
        Joi.object({
            name: Joi.string().min(1).required(),
            quantity: Joi.number().integer().min(1).required(),
            weight: Joi.number().required(),
            description: Joi.string().allow('').optional(),
            cost: Joi.string().optional(),
            isActivatable: Joi.boolean().required(),
            numberOfCharges: Joi.number().integer().optional(),
            dmgDice: Joi.string().optional(),
            armorClass: Joi.number().optional(),
            attackBonus: Joi.number().optional(),
            armorBonus: Joi.number().optional(),
            range: Joi.string().optional(),
        })
    ).optional(),

    spells: Joi.array().items(
        Joi.object({
            name: Joi.string().min(1).required(),
            damageRoll: Joi.string().optional(),
            damageType: Joi.string().optional(),
            savingThrow: Joi.string().optional(),
            hitRoll: Joi.string().optional(),
            shape: Joi.string().optional(),
            size: Joi.string().optional(),
            damageInstances: Joi.number().integer().optional(),
            spellSlot: Joi.number().integer().optional(),
            description: Joi.string().optional(),
            range: Joi.string().optional(),
            duration: Joi.string().optional(),
            effect: Joi.string().optional(),
            action: Joi.string().optional(),
            classAvailability: Joi.string().min(1).required(),
            school: Joi.string().min(1).required(),
            castingTime: Joi.string().optional(),
            concentration: Joi.boolean().optional(),
            ritual: Joi.boolean().optional(),
            verbalComponents: Joi.boolean().optional(),
            somaticComponents: Joi.boolean().optional(),
            materialComponents: Joi.boolean().optional(),
            higherLevelScaling: Joi.boolean().optional(),
        })
    ).optional(),

    proficiencies: Joi.array().items(
        Joi.object({
            armor: Joi.string().required(),
            weapons: Joi.string().required(),
            tools: Joi.string().required(),
            savingThrows: Joi.string().required(),
        })
    ).optional(),

}).unknown(false);

