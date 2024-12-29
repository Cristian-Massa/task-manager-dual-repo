import { MongoDB } from "@/mongoose/MongoDbConnection";
import { Users } from "@/src/models/Users";
import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
export async function verifySession(req: Request, res: Response) {
  const mongoDb = MongoDB.getInstance();
  const session = req.cookies["session"];
  const decoded = jsonwebtoken.decode(session) as jsonwebtoken.JwtPayload;
  try {
    await mongoDb.connect();
    if (decoded as jsonwebtoken.JwtPayload) {
      const findUser = await Users.findById(decoded.id);
      if (!findUser) {
        res.status(400).json({ error: "This user doesnt exits" });
        return;
      }
    }
    res.status(200).json("Welcome!");
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  } finally {
    await mongoDb.disconnect();
  }
}
