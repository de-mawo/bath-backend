import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prisma";
import { EmploymentStatus, Role } from "@prisma/client";

type AdminEditUserData = {
  id: string;
  course: string;
  role: Role;
};

type EditMeData = {
  email: string;
  phone: string;
  github: string;
  linkedIn: string;
  discord: string;
};

type EmploymentStatusData = {
  email: string;
  employmentStatus: EmploymentStatus;
};

export async function getMe(req: Request, res: Response, next: NextFunction) {
  const params = req.params;
  const { email } = params;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return res.json(user).status(200);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}

export async function adminEditUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body: AdminEditUserData = await req.body;

    const { id, role, course } = body;

    await prisma.user.update({
      where: { id },
      data: { role, course },
    });

    return res.json({ message: "Success" }).status(200);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}

export async function editMe(req: Request, res: Response, next: NextFunction) {
  try {
    const body: EditMeData = await req.body;

    const { email, phone, github, linkedIn, discord } = body;

    await prisma.user.update({
      where: { email: email },
      data: {
        phone,
        github,
        linkedIn,
        discord,
      },
    });

    return res.json({ message: "Success" }).status(200);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}

export async function editMyEmploymentStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body: EmploymentStatusData = await req.body;

    const { email, employmentStatus } = body;

    await prisma.user.update({
      where: { email: email },
      data: {
        employment: employmentStatus,
      },
    });
    return res.json({ message: "Success" }).status(200);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany({});
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Server Error",
    });
  }
};

type AddEmailAllowed = {
  email: string;
};

export async function allowedEmails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body: AddEmailAllowed = await req.body;
    const { email } = body;

    const allowed = await prisma.allowedEmails.findMany({});
    const emails = allowed[0].emails;
    const allowedId = allowed[0].id;

    if (emails.includes(email)) {
      return res.json("Email Already Exist");
    }
    let updatetryEntry = [...(emails || [])];

    updatetryEntry.push(email);

    await prisma.allowedEmails.update({
      where: { id: allowedId },
      data: {
        emails: updatetryEntry,
      },
    });
    return res.json({ message: "Success" }).status(200);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}
