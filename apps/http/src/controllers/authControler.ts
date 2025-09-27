import { Request, Response } from "express";
import { googleAuthService } from "../service/authService";
import { error } from "console";


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
        res.status(500).json({ error: error.message || "OAuth failed"});
    }
}