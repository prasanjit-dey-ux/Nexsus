import { Router } from "express";

export const spaceRouter = Router();

// CRUD space
spaceRouter.post("/", (req, res) => {
    console.log("Create your space");
});

spaceRouter.get("/", (req, res) => {
    console.log("Get all the spaces which you created or joined")
});

spaceRouter.put("/:id", (req, res) => {
    console.log("update the space data")
})

spaceRouter.get("/:id", (req, res) => {
    console.log("Get the space by id")
});

spaceRouter.delete("/:id", (req, res) => {
    console.log("Delete the space")
});

// join and leave space

spaceRouter.post("/:id/join", (req, res) => {
    console.log("Join space");
});

spaceRouter.post("/:id/leave", (req, res) => {
    console.log("leaver the space");
});


// Participants

spaceRouter.get("/:id/participants", (req, res) => {
    console.log("all the participants")
});

spaceRouter.patch("/:id/participants/:userId/role", (req, res) => {
    console.log("giving roles to normal user")
});

spaceRouter.delete("/:id/participants/:userId", (req, res) => {
    console.log("Kick out from the space")
});






