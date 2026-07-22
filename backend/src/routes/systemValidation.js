// Week 6 - Day 1

import express from "express";
import systemValidationController from "../controllers/systemValidationController.js";

const router = express.Router();

router.get("/", systemValidationController);

export default router;
