import { Request, Response } from 'express';
import { validate, loginSchema } from '../validation';
import { User } from '../models';
import { Unauthorized } from '../errors/errors';
import { logIn, logOut } from '../auth';

export const login = async (req: Request, res: Response) => {
    await validate(loginSchema, req.body);

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchesPassword(password))) {
        throw new Unauthorized('Incorrect email or password');
    }
    if (!user.verificated) {
        throw new Unauthorized('Confirm email first');
    }
    logIn(req, user.id);

    res.json({
        message: 'ok'
    });
};

export const logout = async (req: Request, res: Response) => {
    await logOut(req, res);

    res.status(200).json({
        message: 'Sucessfully loged in'
    });
};
