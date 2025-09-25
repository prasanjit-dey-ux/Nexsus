import { Router } from "express";

export const mapRouter = Router();

mapRouter.get("/", (req, res) => {
    console.log("Get all the maps");
});

mapRouter.get("/:id", (req, res)=> {
    console.log("get the one map")
})