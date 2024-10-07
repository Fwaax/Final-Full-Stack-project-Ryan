import Joi from 'joi';

export const newCharacterValidationJoi = Joi.object({
    name: Joi.string().required(),
    class: Joi.string().required(),
    race: Joi.string().required(),
    level: Joi.number().required(),
    background: Joi.string().required(),
    characteristics: Joi.string().required(),
    personalityTraits: Joi.string().required(),
    organizations: Joi.string().optional(),
    allies: Joi.string().optional(),
    enemies: Joi.string().optional(),
    backstory: Joi.string().required(),
    other: Joi.string().optional(),
    strength: Joi.number().required(),
    dexterity: Joi.number().required(),
    constitution: Joi.number().required(),
    intelligence: Joi.number().required(),
    wisdom: Joi.number().required(),
    charisma: Joi.number().required(),
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
    inventory: Joi.array().items(Joi.string()).optional(),
    spells: Joi.array().items(Joi.string()).optional(),
}).unknown(false);  // Reject unknown fields like userId, createdAt, updatedAt
