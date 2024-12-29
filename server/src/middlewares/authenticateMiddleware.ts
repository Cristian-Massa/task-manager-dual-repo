import { verifyToken } from "@/src/utils/verifyToken";
import { NextFunction, Request, Response } from "express";

export function authenticateMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const sessionToken = request.cookies.session;

  if (!sessionToken) {
    response.status(401).json({ error: "Please log in to continue" });
    return;
  }

  verifyToken(sessionToken, response);
  next();
}
