import { Request, Response } from 'express';
import { registerSchema } from '../validation';
import { User } from '../models';
import { logIn } from '../auth';
import { validate } from '../validation/index';
import { BadRequest } from '../errors/errors';

export const registerUser = async (req: Request, res: Response) => {
    await validate(registerSchema, req.body);

    const { email, name, password } = req.body;
    const foundUser = await User.exists({ email });

    if (foundUser) throw new BadRequest('Invalid email');

    const user = await User.create({ email, name, password });

    logIn(req, user.id);
    user.save();
    return res.status(201).json({
        message: 'ok',
        data: user
    });
};
