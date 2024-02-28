import express from "express";
import { isAdmin, isUser } from "../utils/isAuth";
import { createTask, getAllTasks, getProjectTaskData } from "../controllers/taskController";

const router = express.Router();

router.route("/").get(isAdmin, getAllTasks).post(isAdmin, createTask);

router.route("/:id").get(isUser, getProjectTaskData)

//Add patch later

export default router;
