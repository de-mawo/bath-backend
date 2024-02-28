import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prisma";

type CreateTaskData = {
  title: string;
  requirements: string[];
  number: number;
  question: string;
  demo: string;
  projectId: string;
  possiblePoint: number;
  progLang: string;
  markingScheme: string;
};

export async function createTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body: CreateTaskData = await req.body;

    const {
      title,
      requirements,
      number,
      question,
      demo,
      projectId,
      possiblePoint,
      progLang,
      markingScheme,
    } = body;

    await prisma.task.create({
      data: {
        title,
        requirements,
        number,
        question,
        demo,
        projectId,
        possiblePoint,
        progLang,
        markingScheme,
      },
    });

    return res.json({ message: "Success" }).status(200);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}


export const getProjectTaskData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = req.params;
  const id = params.id as string;

  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: id,
      }, orderBy: {
        number: "asc"
      }
    });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Server Error",
    });
  }
};

export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await prisma.task.findMany({});
    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Server Error",
    });
  }
};
