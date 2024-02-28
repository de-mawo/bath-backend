import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prisma";
import slugify from "slugify";

type CreateModuleData = {
  title: string;
  code: string;
  category: string;
  courseId: string;
  tags: string[];
  courseCode: string;
};



export async function createModule(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body: CreateModuleData = await req.body;

    const slug = slugify(body.title, { lower: true });
    const { title, category, code, tags, courseId, courseCode } = body;

    await prisma.module.create({
      data: {
        title,
        slug,
        category,
        courseId,
        code,
        tags,
        courseCode,
      },
    });

    return res.json({ message: "Success" }).status(200);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}


export const getAllModules = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const modules = await prisma.module.findMany({});
    return res.status(200).json(modules);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Server Error",
    });
  }
};