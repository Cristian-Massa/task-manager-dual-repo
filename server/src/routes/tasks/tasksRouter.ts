import { tasksDeleteController } from "@/src/controllers/tasks/tasksDeleteController";
import { tasksGetController } from "@/src/controllers/tasks/tasksGetController";
import { tasksGetDetailedController } from "@/src/controllers/tasks/tasksGetDetailedController";
import { tasksPostController } from "@/src/controllers/tasks/tasksPostController";
import { tasksUpdateController } from "@/src/controllers/tasks/tasksUpdateController";
import { authMiddleware } from "@/src/middlewares/authMiddleware";
import { Router } from "express";
import { body, param } from "express-validator";

export const tasksRouter = Router();

tasksRouter.use("/tasks", authMiddleware);
tasksRouter.get("/tasks", tasksGetController);
tasksRouter.get(
  "/tasks/:id",
  [param("id").isMongoId().withMessage("Id should be mongo id")],
  tasksGetDetailedController
);
tasksRouter.delete(
  "/tasks/:id",
  [param("id").isMongoId().withMessage("Id should be mongo id")],
  tasksDeleteController
);
tasksRouter.post(
  "/tasks",
  [body("title").notEmpty().withMessage("Title is required")],
  tasksPostController
);
tasksRouter.put(
  "/tasks/:id",
  [
    param("id").isMongoId().withMessage("Id should be mongo id"),
    body("title").notEmpty().withMessage("Title is required"),
    body("description").optional(),
  ],
  tasksUpdateController
);
