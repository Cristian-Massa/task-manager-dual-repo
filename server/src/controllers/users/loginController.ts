import { NODE_ENV } from "@/src/config/envConfig";
import { Users } from "@/src/models/Users";
import { createToken } from "@/src/utils/createToken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
export async function loginController(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const userInfo = req.body;
  try {
    const findUser = await Users.findOne({
      username: userInfo.username,
    });
    if (!findUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const isTheSamePassword = await bcrypt.compare(
      userInfo.password,
      findUser.password
    );
    if (!isTheSamePassword) {
      res.status(400).json({ error: "Passwords do not match" });
      return;
    }
    const token = createToken(findUser._id);
    res.cookie("session", token, {
      secure: NODE_ENV === "production" ? true : false,
      httpOnly: true,
      sameSite: NODE_ENV === "production" ? "none" : "lax",
    });
    res.status(200).json("Welcome!");
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
