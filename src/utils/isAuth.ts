import { Request, Response, NextFunction } from "express";

interface UserWithRole {
  role?: string;
}

interface RequestWithUserRole extends Request {
  user?: UserWithRole;
}

// Auth guard to check alloed user to access a resource
const checkUserRole =
  (allowedRole: string) =>
  async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
    const { user } = req;

    if (!user || (user.role && user.role !== allowedRole)) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    next();
  };
export const isAdmin = checkUserRole("ADMIN");
export const isUser = checkUserRole("USER");
export const isModerator = checkUserRole("MODERATOR");
