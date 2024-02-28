import express from "express";
import { isUser } from "../utils/isAuth";
import {
  calcUpdateMarks,
  createProjectMarks,
  getOneProjectMarksData,
  userModuleMarks,
} from "../controllers/marksController";

const router = express.Router();

router
  .route("/")
  .post(isUser, createProjectMarks)
  .get(isUser, userModuleMarks)
  .patch(isUser, calcUpdateMarks);

router.route("/:projectId").get(isUser, getOneProjectMarksData);

export default router;
