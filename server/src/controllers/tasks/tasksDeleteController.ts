import { MongoDB } from "@/mongoose/MongoDbConnection";
import { Tasks } from "@/src/models/Tasks";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

export async function tasksDeleteController(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const { id } = req.params;

  const mongoDB = MongoDB.getInstance();
  try {
    await mongoDB.connect();

    const tasks = await Tasks.findByIdAndDelete(id);

    if (!tasks) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.status(200).json("Task deleted");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await mongoDB.disconnect();
  }
}
