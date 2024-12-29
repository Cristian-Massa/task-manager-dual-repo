import { MongoDB } from "@/mongoose/MongoDbConnection";
import { Tasks } from "@/src/models/Tasks";
import { Request, Response } from "express";
type UpdateData = {
  title: string;
  description?: string;
  completed: boolean;
};

export async function tasksUpdateController(req: Request, res: Response) {
  const { id } = req.params;
  const updateData = req.body;
  const mongoDB = MongoDB.getInstance();
  if (id.length !== 24) {
    res.status(400).json({ error: "Id is invalid" });
    return;
  }
  if (!updateData.title) {
    res.status(400).json({ error: "Title is required" });
    return;
  }
  try {
    await mongoDB.connect();

    const updatedTask = await Tasks.findByIdAndUpdate({ _id: id }, updateData, {
      new: true,
    }).select({
      __v: 0,
    });
    if (!updatedTask) {
      res.status(404).json({ error: "Task not found or not updated" });
      return;
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: (error as Error).message });
  } finally {
    await mongoDB.disconnect();
  }
}
