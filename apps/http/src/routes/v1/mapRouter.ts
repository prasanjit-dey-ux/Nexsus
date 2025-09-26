import { Router } from "express";

export const mapRouter = Router();

mapRouter.get("/", (req, res) => {
    console.log("Get all the maps");
});

mapRouter.get("/:id", (req, res)=> {
    console.log("get the one map")
});

mapRouter.post("/", (req, res) => {}) //Admin Creat Map 
mapRouter.put("/:id", (req, res) => {}) //Admin Update Map
mapRouter.delete("/:id", (req, res) => {}) //Admin Delete Map

// Element management (admin/premium);

mapRouter.get("/:id/elements", (req, res) => {}) // Get the elements from the map
mapRouter.post("/:id/elements", (req, res) => {}) // Add Element in the map
mapRouter.delete("/:id/elements/:elementId", (req, res) => {}) // Delete element from the map


