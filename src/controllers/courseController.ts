import { Request, Response } from "express";
import prisma from "../utils/prisma";
import slugify from "slugify";

type SubmittedEditData = {
  courseId: string;
  studentEmail: string;
};

type SubmittedCreateData = {
  title: string;
  code: string;
  category: string;
  tags: string[];
};

export const getAllCourses = async (res: Response) => {
  try {
    const courses = await prisma.course.findMany({});
    return res.status(200).json({
      message: "success",
      data: { courses },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Server Error",
    });
  }
};

export async function createCourse(req: Request, res: Response) {

  console.log("Mucreation",req.query);
  

  // try {
  //   const body: SubmittedCreateData = await req.body();

  //   const students = ["demostudent@bath.com"]; // Our schema always need to start with a user being part of a course hence this dummy string
  //   const slug = slugify(body.title, { lower: true });
  //   const { title, category, code, tags } = body;

  //   await prisma.course.create({
  //     data: {
  //       title,
  //       students,
  //       slug,
  //       category,
  //       code,
  //       tags,
  //     },
  //   });

  //   return res.json({ message: "Success" }).status(200);
  // } catch (error) {
  //   console.error(error);
  //   return res.status(500).json({ error});
  // }
}

export async function editCourse(req: Request, res: Response) {
  try {
    const body: SubmittedEditData = await req.body();

    const { courseId, studentEmail } = body;

    const course = await prisma.course.findFirst({
      where: { id: courseId },
    });

    if (course?.students.includes(studentEmail)) {
      return res.status(409).json({ message: "Already Exist" });
    }
    let students = [...(course?.students || [])];

    students.push(studentEmail);

    await prisma.course.update({
      where: { id: courseId },
      data: {
        students,
      },
    });

    return res.json({ message: "Success" }).status(200);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
}
