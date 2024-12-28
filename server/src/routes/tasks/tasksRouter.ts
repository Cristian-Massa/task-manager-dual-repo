import { tasksDeleteController } from "@/src/controllers/tasks/tasksDeleteController";
import { tasksGetController } from "@/src/controllers/tasks/tasksGetController";
import { tasksGetDetailedController } from "@/src/controllers/tasks/tasksGetDetailedController";
import { tasksPostController } from "@/src/controllers/tasks/tasksPostController";
import { tasksUpdateController } from "@/src/controllers/tasks/tasksUpdateController";
import { Router } from "express";

export const tasksRouter = Router();

tasksRouter.get("/tasks", tasksGetController);
tasksRouter.get("/tasks/:id", tasksGetDetailedController);
tasksRouter.delete("/tasks/:id", tasksDeleteController);
tasksRouter.post("/tasks", tasksPostController);
tasksRouter.put("/tasks/:id", tasksUpdateController);
