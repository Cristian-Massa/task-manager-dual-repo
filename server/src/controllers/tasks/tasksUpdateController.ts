import { Tasks } from "@/src/models/Tasks";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

export async function tasksUpdateController(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const { id } = req.params;
  const updateData = req.body;
  try {
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
  }
}
