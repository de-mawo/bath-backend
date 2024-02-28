import express from "express";
import { isAdmin } from "../utils/isAuth";
import {
  createProject,
  getAllProjects,
} from "../controllers/projectController";

const router = express.Router();

router
  .route("/")
  .get(isAdmin, getAllProjects)
  .post(isAdmin, createProject)

  

export default router;
