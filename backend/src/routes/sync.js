//5-1
import express from "express";
import syncController from "../controllers/syncController.js";

const router = express.Router();

router.get("/", syncController);

export default router;
