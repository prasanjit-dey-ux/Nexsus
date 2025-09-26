import { Router } from "express";

export const utilityRouter = Router();

utilityRouter.get("/health", (req, res) => {
    console.log("Check health");
});

utilityRouter.get("/ping", (req, res) => {
    console.log("Check ping");
})