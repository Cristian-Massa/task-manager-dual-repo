import { MongoDB } from "@/mongoose/MongoDbConnection";
import { Tasks } from "@/src/models/Tasks";
import { Request, Response } from "express";

export async function tasksGetDetailedController(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: "Id is required" });
    return;
  }
  const mongoDB = MongoDB.getInstance();
  try {
    await mongoDB.connect();
    const tasks = await Tasks.findOne({ _id: id });
    await mongoDB.disconnect();

    if (!tasks) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
