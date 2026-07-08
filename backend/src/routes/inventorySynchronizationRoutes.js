//week3-day2
import express from "express";
import { synchronizeInventoryController } from "../controllers/inventorySynchronizationController.js";

const router = express.Router();

router.get("/inventory-synchronization", synchronizeInventoryController);

export default router;