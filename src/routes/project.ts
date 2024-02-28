import express from "express";
import { isAdmin, isUser } from "../utils/isAuth";
import {
  createProject,
  getAllProjects,
  getMyProjects,
  getProject,
} from "../controllers/projectController";

const router = express.Router();

router
  .route("/")
  .get(isAdmin, getAllProjects)
  .post(isAdmin, createProject)

  router
  .route("/myProjects")
  .get(isUser, getMyProjects)

  router
  .route("/:id")
  .get(isUser, getProject)
  
  

export default router;
