import express from "express";
import { isAdmin, isUser } from "../utils/isAuth";
import {
  getAllUsers,
  adminEditUser,
  editMe,
  editMyEmploymentStatus,
} from "../controllers/userController";

const router = express.Router();

router.route("/").get(isAdmin, getAllUsers);

router.route("/admin/:id").patch(isAdmin, adminEditUser);

router.route("/:id").patch(isUser, editMe);

router.route("/admin/:id").patch(isUser, editMyEmploymentStatus);

export default router;
