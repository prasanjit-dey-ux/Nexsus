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

