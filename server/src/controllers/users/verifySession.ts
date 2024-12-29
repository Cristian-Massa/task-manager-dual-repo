import { MongoDB } from "@/mongoose/MongoDbConnection";
import { verifyToken } from "@/src/utils/verifyToken";
import { Request, Response } from "express";

export async function verifySession(req: Request, res: Response) {
  const mongoDb = MongoDB.getInstance();
  const session = req.cookies["session"];
  const decoded = verifyToken(session, res);
  console.log(decoded);
  try {
    await mongoDb.connect();
    res.status(200).json("Welcome!");
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  } finally {
    await mongoDb.disconnect();
  }
}
