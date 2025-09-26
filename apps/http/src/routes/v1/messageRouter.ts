import { Router } from "express";

export const messageRouter = Router();

messageRouter.get("/", (req, res) => {
    console.log("Get all the messages");
});

messageRouter.get("/:id", (req, res) => {
    console.log("Get specific messages");
});

