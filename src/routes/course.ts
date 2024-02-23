import express from "express";
import { isAdmin } from "../utils/isAuth";
import {
  createCourse,
  editCourse,
  getAllCourses,
} from "src/controllers/courseController";

const router = express.Router();

router
  .route("/")
  .get(isAdmin, getAllCourses)
  .post(isAdmin, createCourse)

  router
  .route('/:id')
  .patch(isAdmin, editCourse);

export default router;
