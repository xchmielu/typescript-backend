import Joi from '@hapi/joi';
import { BCRYPT_MAX_BYTES } from '../config';

const email = Joi.string()
    .email()
    .min(8)
    .max(254)
    .lowercase()
    .trim()
    .required();

const name = Joi.string()
    .min(3)
    .max(128)
    .trim()
    .required();

const password = Joi.string()
    .min(6)
    .max(BCRYPT_MAX_BYTES, 'utf8')
    .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
    .message(
        'Password must contains one upper case, one lowercase, one digit'
    )
    .required();

const passwordConfrimation = Joi.valid(
    Joi.ref('password')
).required();

export const registerSchema = Joi.object({
    email,
    name,
    password,
    passwordConfrimation
});

export const loginSchema = Joi.object({
    email,
    password
});
