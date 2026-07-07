//week3-day1
class TransactionSynchronizationValidator {
  validate(records) {
    return records.every(
      (record) =>
        record.transactionId &&
        record.product &&
        record.quantity > 0 &&
        record.status === "Synchronized"
    );
  }
}

module.exports = TransactionSynchronizationValidator;
