import express from "express";
import { isAdmin } from "../utils/isAuth";
import { createEvent, getAllEvents } from "../controllers/eventController";

const router = express.Router();

router.route("/").get(isAdmin, getAllEvents).post(isAdmin, createEvent);

//Add patch later

export default router;
