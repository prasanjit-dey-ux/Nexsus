import { Request, Response } from "express";
import { googleAuthService, githubAuthService } from "../service/authService";


export const googleAuth = async (req: Request, res: Response): Promise<void> => {
    try {
        const { idToken } = req.body;
        if(!idToken) {
            res.status(400).json({ error: "Missing token"});
            return;
        };
        const result = await googleAuthService(idToken);
        res.json(result);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "OAuth failed"
        res.status(500).json({ error: errorMessage});
    }
}

export const githubAuth = async (req: Request, res: Response): Promise<void> => {
    try {
        const { code } = req.body;
        if(!code){
            res.status(400).json({error: "Missing code"});
            return
        }
        const result = await githubAuthService(code);
        res.json(result);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "OAuth failed"
        res.status(500).json({ error: errorMessage})
    }
}