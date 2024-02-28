import express from "express";
import { isAdmin } from "../utils/isAuth";
import { createTask, getAllTasks } from "../controllers/taskController";

const router = express.Router();

router.route("/").get(isAdmin, getAllTasks).post(isAdmin, createTask);

//Add patch later

export default router;
