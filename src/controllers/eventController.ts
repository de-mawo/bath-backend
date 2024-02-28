import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prisma";

type CreateEventData = {
  title: string;
  course: string;
  url: string;
  venue: string;
  description: string;
  startDate: string;
  endDate: string;
};

export async function createEvent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body: CreateEventData = await req.body;

    const { title, description, startDate, course, url, endDate, venue } = body;
    await prisma.events.create({
      data: {
        startDate,
        title,
        description,
        course,
        venue,
        url,
        endDate,
      },
    });

    return res.json({ message: "Success" }).status(200);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}

export const getAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await prisma.events.findMany({});
    return res.status(200).json(events);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Server Error",
    });
  }
};


