import { loginController } from "@/src/controllers/users/loginController";
import { registerController } from "@/src/controllers/users/registerController";
import { Router } from "express";
import { body } from "express-validator";

export const usersRouter = Router();

usersRouter.post(
  "/users/login",
  [
    body("username").notEmpty().withMessage("Username cannot be empty"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Your password must be 8 chars min"),
  ],
  loginController
);

usersRouter.post(
  "/users/register",
  [
    body("username").notEmpty().withMessage("Username cannot be empty"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Your password must be 8 chars min"),
  ],
  registerController
);