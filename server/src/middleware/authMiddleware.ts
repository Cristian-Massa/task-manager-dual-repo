import { JSON_WEB_TOKEN_SECRET } from "@/src/config/envConfig";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const excludedRoute = "/api/tasks";
  if (req.originalUrl.includes(excludedRoute) && req.method === "GET") {
    next();
  }
  const cookie = req.cookies["session"];
  jwt.verify(cookie, JSON_WEB_TOKEN_SECRET!);
}
