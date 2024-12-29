import { MongoDB } from "@/mongoose/MongoDbConnection";
import { Tasks } from "@/src/models/Tasks";
import { Request, Response } from "express";

export async function tasksGetDetailedController(req: Request, res: Response) {
  const { id } = req.params;
  if (id.length !== 24) {
    res.status(400).json({ error: "Id is invalid" });
    return;
  }
  const mongoDB = MongoDB.getInstance();
  try {
    await mongoDB.connect();
    const tasks = await Tasks.findOne({ _id: id }).select({
      __v: 0,
    });
    await mongoDB.disconnect();

    if (!tasks) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({ error: "Internal server error" });
  }
}
