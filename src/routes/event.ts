import express from "express";
import { isAdmin, isUser } from "../utils/isAuth";
import { createEvent, getAllEvents, getMyEvents } from "../controllers/eventController";

const router = express.Router();

router.route("/").get(isAdmin, getAllEvents).post(isAdmin, createEvent);
router.route("/user").get(isUser, getMyEvents)

//Add patch later

export default router;
