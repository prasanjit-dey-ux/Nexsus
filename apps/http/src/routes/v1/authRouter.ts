import { Router } from "express";

export const authRouther = Router();


// Oauth

authRouther.post("/google", (req, res) => {
    console.log("Google Oauth");
});

authRouther.post ("/github", (req, res) => {
    console.log("Github Oauth"); 
});

// email auth
authRouther.post("/email", (req, res) => {
    console.log("email auth");
})

// password reset
authRouther.post("/password-reset/request", (req, res) => {
    console.log("Password Reset request"); 
})

authRouther.post("/password-reset/confirm", (req, res) => {
    console.log("Password Reset confirmed"); 
})


// Register, Login and Logout
authRouther.post("/register", (req, res) => {
    console.log("Register user");
})

authRouther.post("/login", (req, res) => {
    console.log("Login user");
})

authRouther.post("/logout", (req, res) => {
    console.log("Logout");
})

