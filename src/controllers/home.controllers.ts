import { Request, Response } from 'express';
import { User } from '../models';

export const home = async (req: Request, res: Response) => {
    const user = await User.findById(req.session!.userId);

    res.json({
        data: user
    });
};
