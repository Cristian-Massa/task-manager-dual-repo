import { verifyToken } from "@/src/utils/verifyToken";
import { NextFunction, Request, Response } from "express";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const session = req.cookies["session"];

  if (!session) {
    res.status(401).json({ error: "Pleas log in for do that" });
    return;
  }
  verifyToken(session, res);
  next();
}
