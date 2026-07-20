//4-2
import express from "express";
import alertController from "../controllers/alertController.js";

const router = express.Router();

router.get("/", alertController);

export default router;