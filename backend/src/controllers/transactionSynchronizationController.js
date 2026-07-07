//week3-day1
const TransactionSynchronizationService = require("../services/TransactionSynchronizationService");

class TransactionSynchronizationController {
  constructor() {
    this.transactionSynchronizationService =
      new TransactionSynchronizationService();
  }

  synchronizeTransaction(req, res) {
    try {
      const transaction = req.body;

      const result =
        this.transactionSynchronizationService.synchronize(transaction);

      return res.status(200).json({
        success: true,
        message: "Transaction synchronized successfully.",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Transaction synchronization failed.",
        error: error.message,
      });
    }
  }
}

module.exports = new TransactionSynchronizationController();