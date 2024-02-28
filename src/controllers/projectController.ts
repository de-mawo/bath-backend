import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prisma";
import slugify from "slugify";
import { User } from "@prisma/client";

type CreateProjectData = {
  title: string;
  code: string;
  category: string;
  moduleId: string;
  tags: string[];
  description: string;
  requirements: string[];
  resources: string[];
  objectives: string[];
  startDate: string;
  endDate: string;
  courseCode: string;
};

export async function createProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body: CreateProjectData = await req.body;

    const slug = slugify(body.title, { lower: true });
    const {
      title,
      category,
      code,
      tags,
      moduleId,
      description,
      requirements,
      resources,
      objectives,
      startDate,
      endDate,
      courseCode,
    } = body;

    await prisma.project.create({
      data: {
        title,
        slug,
        category,
        moduleId,
        description,
        code,
        tags,
        requirements,
        resources,
        objectives,
        startDate,
        endDate,
        courseCode,
      },
    });

    return res.json({ message: "Success" }).status(200);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}

export const getMyProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as User;
  const courseCode = user.course as string;

  try {
    const projects = await prisma.project.findMany({
      where: {
        courseCode,
      },
      orderBy: {
        startDate: "asc",
      },
    });

    return res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Server Error",
    });
  }
};

export const getProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = req.params;
  const id = params.id as string;

  try {
    const project = await prisma.project.findFirst({
      where: {
        id,
      },
    });

    return res.status(200).json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Server Error",
    });
  }
};

export const getAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await prisma.project.findMany({});
    return res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Server Error",
    });
  }
};
