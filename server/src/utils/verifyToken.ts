import { JSON_WEB_TOKEN_SECRET } from "@/src/config/envConfig";
import { Response } from "express";
import jsonwebtoken from "jsonwebtoken";

export function verifyToken(token: string, res: Response) {
  return jsonwebtoken.verify(token, JSON_WEB_TOKEN_SECRET, (err, data) => {
    if (err) {
      res.status(401).json({ error: "Your session is expired" });
      return;
    }
    return data;
  });
}
