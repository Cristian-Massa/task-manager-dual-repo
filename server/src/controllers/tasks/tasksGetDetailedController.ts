import { Tasks } from "@/src/models/Tasks";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

export async function tasksGetDetailedController(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const { id } = req.params;
  try {
    const tasks = await Tasks.findOne({ _id: id }).select({
      __v: 0,
    });

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
