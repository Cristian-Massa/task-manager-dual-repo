import { JSON_WEB_TOKEN_SECRET } from "@/src/config/envConfig";
import { Users } from "@/src/models/Users";
import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
export async function verifySession(req: Request, res: Response) {
  const sessionToken = req.cookies.session;

  try {
    const decodedToken = jsonwebtoken.verify(
      sessionToken,
      JSON_WEB_TOKEN_SECRET!
    ) as jsonwebtoken.JwtPayload;
    const user = await Users.findById(decodedToken.id);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json("Welcome!");
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
