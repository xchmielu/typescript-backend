import { Request, Response } from 'express';
import { validate, forgotPasswordSchema } from '../validation';
import { User } from '../models';

export const forgot = async (req: Request, res: Response) => {
    await validate(forgotPasswordSchema, req.body);

    const { email } = req.body;

    const user = await User.find({ email });

    //Send mail with veryfication
};
