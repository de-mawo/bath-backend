import express from "express";
import { isAdmin } from "../utils/isAuth";
import {
  createModule,
  getAllModules,
} from "../controllers/moduleController";

const router = express.Router();

router
  .route("/")
  .get(isAdmin, getAllModules)
  .post(isAdmin, createModule)

  

export default router;
