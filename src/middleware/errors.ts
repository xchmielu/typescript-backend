import {
    RequestHandler,
    Response,
    Request,
    NextFunction
} from 'express';

export const CatchAsync = (handler: RequestHandler) => (
    ...args: [Request, Response, NextFunction]
) => handler(...args).catch(args[2]);
export const NotFound = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(404).json({ message: 'Page not found' });
};

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error'
    });
};
