import Joi from "joi";
import mongoose from "mongoose";

export const EMAIL_REGEX = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_REGEX = /^(?=(?:.*[A-Z]){3})(?=(?:.*[a-z]){3})(?=(?:.*\d){1})(?=(?:.*[!@#$%^&*]){1}).*$/;  // at least 3 uppercase, 3 lowercase, 1 number, 1 special character

const objectIdValidation = (value, helpers) => {
    if (!(value instanceof mongoose.Types.ObjectId)) {
        return helpers.error('any.invalid');
    }
    return value;
};


// Signup
export const UserSignupValidationJoi = Joi.object({
    userName: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().pattern(EMAIL_REGEX).required(),
    password: Joi.string().min(8).max(20).pattern(PASSWORD_REGEX).required(),
    nickname: Joi.string().min(2).max(20)
});

// Login
export const LoginValidationJoi = Joi.object({
    email: Joi.string().email().pattern(EMAIL_REGEX).required(),
    password: Joi.string().min(7).max(20).pattern(PASSWORD_REGEX).required(),
});

// Card joi
export const cardValidationCreationJoi = Joi.object({
    title: Joi.string().min(2).max(30).required(),
    subtitle: Joi.string().min(2).max(30).required(),
    description: Joi.string().min(2).max(60).required(),
    phone: Joi.string().pattern(/^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/).required(),
    email: Joi.string().email().required(),
    web: Joi.string().uri({ scheme: ['https'] }).required(),

    image: Joi.object({
        url: Joi.string().uri().required(),
        alt: Joi.string().required(),
    }).required(),

    address: Joi.object({
        state: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required(),
        street: Joi.string().required(),
        houseNumber: Joi.number().required(),
        zip: Joi.number().required(),
    }).required(),
    bizNumber: Joi.number().required(),
    createdByUserId: Joi.custom(objectIdValidation, 'ObjectId validation').required(),
    createdAt: Joi.date().iso().required(),
});


export const cardValidationEditJoi = Joi.object({
    title: Joi.string().min(2).max(30).optional(),
    subtitle: Joi.string().min(2).max(30).optional(),
    description: Joi.string().min(2).max(60).optional(),
    phone: Joi.string().pattern(/^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/).optional(),
    email: Joi.string().email().optional(),
    web: Joi.string().uri({ scheme: ['https'] }).optional(),

    image: Joi.object({
        url: Joi.string().uri().optional(),
        alt: Joi.string().optional(),
    }),

    address: Joi.object({
        state: Joi.string().optional(),
        city: Joi.string().optional(),
        country: Joi.string().optional(),
        street: Joi.string().optional(),
        houseNumber: Joi.number().optional(),
        zip: Joi.number().optional(),
    }),
});