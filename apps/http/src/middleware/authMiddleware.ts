import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "@metaverse/utils";

export interface AuthRequest extends Request{
    userId : string;
};

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // Extract Bearer token
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) throw new Error ("No token provided");

        // Verify token and pull userId out
        const decoded = verifyJWT(token);
        req.userId = decoded.userId;

        next();
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unaunthorized";
        res.status(401).json({ error: errorMessage});
    }
}