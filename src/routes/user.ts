import express from "express";
import { isAdmin, isUser } from "../utils/isAuth";
import {
  getAllUsers,
  adminEditUser,
  editMe,
  editMyEmploymentStatus,
  allowedEmails,
  getMe,
} from "../controllers/userController";

const router = express.Router();

router.route("/").get(isAdmin, getAllUsers);

router.route("/admin").patch(isAdmin, adminEditUser);

router.route("/allowed").patch(isAdmin, allowedEmails);

router.route("/:email").get(isUser, getMe);

router.route("/me").patch(isUser, editMe);

router.route("/employ").patch(isUser, editMyEmploymentStatus);

export default router;
