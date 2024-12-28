import { MongoDB } from "@/mongoose/MongoDbConnection";
import { Tasks } from "@/src/models/Tasks";
import { Request, Response } from "express";
type UpdateData = {
  title: string;
  description?: string;
  completed: boolean;
};
async function validateRequestData(
  id: string,
  updateData: UpdateData
): Promise<void> {
  if (!id) {
    throw new Error("Id is required");
  }
  if (!updateData || !updateData.title) {
    throw new Error("Title is required");
  }
}

export async function tasksUpdateController(req: Request, res: Response) {
  const { id } = req.params;
  const updateData = req.body;
  const mongoDB = MongoDB.getInstance();

  try {
    await mongoDB.connect();
    await validateRequestData(id, updateData);

    const updatedTask = await Tasks.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true }
    );

    if (!updatedTask) {
      res.status(404).json({ error: "Task not found or not updated" });
      return;
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: (error as Error).message });
  }
}
