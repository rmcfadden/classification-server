import { Request, Response, NextFunction } from "express";
export const AsyncErrorHandler =
    (func: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
    (req: Request, res: Response, next: NextFunction) =>
        Promise.resolve(func(req, res, next)).catch(next);
