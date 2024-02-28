import express from "express";
import { isAdmin, isUser } from "../utils/isAuth";
import {
    createProjectMarks
} from "../controllers/marksController";

const router = express.Router();

router.route("/").post(isUser, createProjectMarks);



export default router;
