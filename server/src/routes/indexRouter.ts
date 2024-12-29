import { tasksRouter } from "@/src/routes/tasks/tasksRouter";
import { Router } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
export const indexRouter = Router();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tasks management api",
      version: "1.0.0",
      description: "Api documentation for test",
    },
  },
  apis: ["./src/routes/tasks/*.ts", "./src/config/tasksSwaggerAnnotations.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

indexRouter.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
indexRouter.use("/api", tasksRouter);
