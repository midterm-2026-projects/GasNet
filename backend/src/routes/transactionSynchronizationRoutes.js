//week3-day1
import express from "express";
import transactionSynchronizationController from "../controllers/transactionSynchronizationController.js";

const router = express.Router();

router.post(
  "/transactions/synchronize",
  transactionSynchronizationController.synchronizeTransaction
);

export default router;