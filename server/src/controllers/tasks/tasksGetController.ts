import { Tasks } from "@/src/models/Tasks";
import { Request, Response } from "express";

export async function tasksGetController(req: Request, res: Response) {
  const { filter } = req.query;
  const cast =
    filter === "true" ? true : filter === "false" ? false : undefined;
  try {
    const tasks = await Tasks.find(
      typeof cast === "boolean" ? { completed: filter } : {}
    ).select({
      __v: 0,
      description: 0,
    });

    if (!tasks.length) {
      res.status(404).json({ error: "Tasks not found" });
      return;
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
