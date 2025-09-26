import { Router } from "express";

export const notificationRouter = Router();

notificationRouter.get("/", (req, res) => {
    console.log("Get all the notification");
});

notificationRouter.patch("/:id/read", (req, res) => {
    console.log("Notfication marked as Read");
});

notificationRouter.delete("/:id", (req, res) => {
    console.log("Remove the notification");
})