import { NODE_ENV } from "@/src/config/envConfig";
import { Response } from "express";

export function createCookie(res: Response, token: string) {
  res.cookie("session", token, {
    secure: NODE_ENV === "production" ? true : false,
    httpOnly: true,
    sameSite: NODE_ENV === "production" ? "none" : "lax",
  });
}
