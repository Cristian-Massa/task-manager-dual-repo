import { MongoDB } from "@/mongoose/MongoDbConnection";
import { Tasks } from "@/src/models/Tasks";
import { Request, Response } from "express";

export async function tasksPostController(req: Request, res: Response) {
  const { title, description } = req.body;
  if (!title) {
    res.status(400).json({ error: "Title is required" });
    return;
  }
  const mongoDB = MongoDB.getInstance();
  try {
    await mongoDB.connect();
    const tasks = await Tasks.create({ title, description });
    await mongoDB.disconnect();
    if (!tasks) {
      res.status(400).json({ error: "Task not created" });
      return;
    }
    res.status(201).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
