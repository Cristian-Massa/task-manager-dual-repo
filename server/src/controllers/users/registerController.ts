import { MongoDB } from "@/mongoose/MongoDbConnection";
import { Users } from "@/src/models/Users";
import { createCookie } from "@/src/utils/createCookie";
import { createToken } from "@/src/utils/createToken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

export async function registerController(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const mongoDb = MongoDB.getInstance();
  const userInfo = req.body;

  try {
    await mongoDb.connect();

    const hash = await bcrypt.hash(userInfo.password, 10);

    const register = new Users({
      username: userInfo.username,
      password: hash,
    });
    const saved = await register.save();

    if (!saved) {
      res.status(400).json({ error: "Error creating user" });
      return;
    }
    const token = createToken(register._id);
    createCookie(res, token);

    res.status(200).json("Welcome!");
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  } finally {
    await mongoDb.disconnect();
  }
}
