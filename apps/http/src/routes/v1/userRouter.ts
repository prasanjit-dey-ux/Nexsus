import { Router } from "express";

export const userRouter = Router();

userRouter.get("/me", (req, res) => {
    console.log("get the profile");
});

userRouter.put("/me", (req, res) => {
    console.log("Update user profile");
})

userRouter.put("/me/password", (req, res) => {
    console.log("Change password");
});

userRouter.get("/:id", (req, res) => {
    console.log("Fetch another profile")
});

userRouter.get("/me/avatars", (req, res) => {
    console.log("Get all my avatars")
})

userRouter.get("/me/messages", (req, res) => {}); //list my DM
userRouter.get("/me/messages/:userId", (req, res) => {}); // DM conversation with user
userRouter.post("/me/messages/:userId", (req, res) => {}); // Send DM