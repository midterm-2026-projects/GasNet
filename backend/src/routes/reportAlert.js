// 5 2
import express from "express";
import reportAlertController from "../controllers/reportAlertController.js";

const router = express.Router();

router.get("/", reportAlertController);

export default router;
