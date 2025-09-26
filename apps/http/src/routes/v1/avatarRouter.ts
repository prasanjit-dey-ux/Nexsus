import { Router } from "express";

export const avatarRouter = Router();

avatarRouter.get("/", (req, res) => {
    console.log("Get all the avatar")
});

avatarRouter.get("/:id", (req, res) => {
    console.log("Avatar details")
})

// Admin
avatarRouter.post("/", (req, res) => {}) // Add avatar
avatarRouter.delete("/:id", (req, res) => {}) // Delete avatar