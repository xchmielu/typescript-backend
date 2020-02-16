import { Request, Response } from 'express';
import { User } from '../models';
import { BadRequest } from '../errors/errors';

export const verify = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        throw new BadRequest('This link is broken');
    }

    await user.verification();
    user.save();

    res.status(200).json({
        message: 'Email confirmed sucessfuly'
    });
};
