import { Request, Response, NextFunction } from 'express';
import { isLoggedIn } from '../auth';
import { Unauthorized, BadRequest } from '../errors/errors';

export const isGuest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (isLoggedIn(req)) {
        return next(new BadRequest('You are already logged in'));
    }
    next();
};

export const isLoggenIn = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!isLoggedIn(req)) {
        return next(new Unauthorized('You must be logged in'));
    }
    next();
};
