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

// join/leave space

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

spaceRouter.patch("/:id/participants/:userId/state", (req, res) => {
    console.log("for avatar, x,y, mute/unmute. Needed for minimap and live presence")
})

// Channel

spaceRouter.post("/:id/channels", (req, res) => {
    console.log("create a channel");
});

spaceRouter.get("/:id/channels", (req, res) => {
    console.log("get all the channel");
});

spaceRouter.get("/:id/channels/:channelId", (req, res) => {
    console.log("get the channel info")
});

spaceRouter.put("/:id/channels/:channelId", (req, res) => {
    console.log("Update the channel");
});

spaceRouter.delete("/:id/channels/:channelId", (req, res) => {
    console.log("Delete the channel");
});

// Message
spaceRouter.get("/:id/channels/:channelId/messages", (req, res) => {
    console.log("List message in the channel");
});

spaceRouter.post("/:id/channels/:channelId/messages", (req, res) => {
    console.log("Send the message in channel")
});

// Global chat

spaceRouter.post("/:id/messages", (req, res) => {
    console.log("Send global message");
});

spaceRouter.get("/:id/messages", (req, res) => {
    console.log("Recieved globat message")
}) 
