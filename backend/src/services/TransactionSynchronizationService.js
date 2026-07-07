//week3-day1
const TransactionDataSender = require("./TransactionDataSender");
const SynchronizedRecordsReceiver = require("./SynchronizedRecordsReceiver");
const TransactionSynchronizationValidator = require("./TransactionSynchronizationValidator");

class TransactionSynchronizationService {
  constructor() {
    this.sender = new TransactionDataSender();
    this.receiver = new SynchronizedRecordsReceiver();
    this.validator = new TransactionSynchronizationValidator();
  }

  synchronize(transaction) {
    const sent = this.sender.send(transaction);

    const records = this.receiver.receive();

    const validated = this.validator.validate(records);

    return {
      sent,
      records,
      validated,
    };
  }
}

module.exports = TransactionSynchronizationService;