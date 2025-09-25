import { Router } from "express";
import { authRouther } from "./authRouter";
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

router.use("/auth", authRouther);
router.use("/user", userRouter);
router.use("/space", spaceRouter);
router.use("/map", mapRouter);


router.use("/utility", utilityRouter);
router.use("/notification", notificationRouter);

router.use("/avatar", avatarRouter);
router.use("/element", elementRouter);
router.use("/admin", adminRouter);
router.use("/message", messageRouter);
