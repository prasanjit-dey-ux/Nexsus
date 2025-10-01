import { Request, Response } from "express";
import { googleAuthService } from "../service/authService";

export const googleAuth = async (req: Request, res: Response): Promise<void> => {
    try {
        const { idToken } = req.body;
        if(!idToken) {
            res.status(400).json({ error: "Missing token"});
            return;
        };
        const result = await googleAuthService(idToken);
        res.json(result);
    } catch (error: any) {
        const errorMessage = error instanceof Error ? error.message : "OAuth failed"
        res.status(500).json({ error: errorMessage});
    }
}