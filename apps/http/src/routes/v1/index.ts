import { Router } from "express";
import { authRouter } from "./authRouter";
import { userRouter } from "./userRouter";
import { adminRouter } from "./adminRouter";
import { avatarRouter } from "./avatarRouter";
import { elementRouter } from "./elementRouter";
import { notificationRouter } from "./notificationRouter";
import { messageRouter } from "./messageRouter";
import { mapRouter } from "./mapRouter";
import { utilityRouter } from "./utilityRouter";
import { spaceRouter } from "./spaceRouter";


export const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/spaces", spaceRouter);
router.use("/maps", mapRouter);


router.use("/utilities", utilityRouter);
router.use("/notifications", notificationRouter);

router.use("/avatars", avatarRouter);
router.use("/elements", elementRouter);
router.use("/admin", adminRouter);
router.use("/messages", messageRouter);
