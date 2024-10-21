import Joi from 'joi';

// Attribute keys for core attributes validation
const attributeKeys = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'] as const;

// Skill keys for skills validation
const skillKeys = [
    'acrobatics', 'animalHandling', 'arcana', 'athletics', 'deception',
    'history', 'insight', 'intimidation', 'investigation', 'medicine',
    'nature', 'perception', 'performance', 'persuasion', 'religion',
    'sleightOfHand', 'stealth', 'survival'
] as const;

// Validator for individual skills
const skillSchema = Joi.object({
    modifier: Joi.string().valid(...attributeKeys).required(),
    proficiency: Joi.boolean().required(),
});

export const newCharacterValidationJoi = Joi.object({
    name: Joi.string().required(),
    class: Joi.string().required(),
    race: Joi.string().required(),
    level: Joi.number().integer().min(1).required(), // New field for level

    background: Joi.string().required().allow(''),
    characteristics: Joi.string().required().allow(''),
    personalityTraits: Joi.string().required().allow(''),
    organizations: Joi.string().optional().allow(''),
    allies: Joi.string().optional().allow(''),
    enemies: Joi.string().optional().allow(''),
    backstory: Joi.string().required().allow(''),
    other: Joi.string().optional().allow(''),

    appearance: Joi.object({
        alignment: Joi.string().required(),
        gender: Joi.string().required(),
        eyes: Joi.string().required(),
        size: Joi.string().required(),
        height: Joi.string().required(),
        faith: Joi.string().required(),
        hair: Joi.string().required(),
        skin: Joi.string().required(),
        age: Joi.string().required(),
        weight: Joi.string().required(),
    }).required(),

    proficiencyBonus: Joi.number().integer().required(), // New field for proficiency bonus

    // Validator for coreAttributes: { STR: number, DEX: number, ... }
    coreAttributes: Joi.object(
        attributeKeys.reduce((acc, key) => ({ ...acc, [key]: Joi.number().required() }), {})
    ).required(),

    // Validator for skills: { acrobatics: Skill, stealth: Skill, ... }
    skills: Joi.object(
        skillKeys.reduce((acc, key) => ({ ...acc, [key]: skillSchema.required() }), {})
    ).required(),

    // Validator for hitPoints: { max: number, current: number, temp: number }
    hitPoints: Joi.object({
        max: Joi.number().integer().required(),
        current: Joi.number().integer().required(),
        temp: Joi.number().integer().required(),
    }).required(),

    inventory: Joi.array().items(Joi.string()).optional(), // Optional inventory
    spells: Joi.array().items(Joi.string()).optional(), // Optional spells

}).unknown(false); // Disallow unknown fields like userId, createdAt, etc.
