import { Router } from "express";

export const authRouter = Router();


// Oauth

authRouter.post("/google", (req, res) => {
    console.log("Google Oauth");
});

authRouter.post ("/github", (req, res) => {
    console.log("Github Oauth"); 
});

// email auth
authRouter.post("/email", (req, res) => {
    console.log("email auth");
})

// password reset
authRouter.post("/password-reset/request", (req, res) => {
    console.log("Password Reset request"); 
})

authRouter.post("/password-reset/confirm", (req, res) => {
    console.log("Password Reset confirmed"); 
})


// Register, Login and Logout
authRouter.post("/register", (req, res) => {
    console.log("Register user");
})

authRouter.post("/login", (req, res) => {
    console.log("Login user");
})

authRouter.post("/logout", (req, res) => {
    console.log("Logout");
})

