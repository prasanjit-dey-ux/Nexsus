import { Router } from "express";

export const elementRouter = Router();

elementRouter.get("/", (req, res) => {
    console.log("element list");
});

elementRouter.get("/:id", (req, res) => {
    console.log("element details")
});

// Admin permission
elementRouter.post("/", (req, res) => {
    console.log("Add elements")
});

elementRouter.delete("/:id", (req, res) => {
    console.log("Delete elements")
})