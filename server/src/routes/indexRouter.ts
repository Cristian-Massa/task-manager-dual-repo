import { tasksRouter } from "@/src/routes/tasks/tasksRouter";
import { Router } from "express";

export const indexRouter = Router();

indexRouter.use("/api", tasksRouter);
