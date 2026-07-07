//week3-day1
const express = require("express");
const router = express.Router();

const transactionSynchronizationController = require("../controllers/transactionSynchronizationController");

router.post(
  "/transactions/synchronize",
  transactionSynchronizationController.synchronizeTransaction
);

module.exports = router;