//week3-day1
import TransactionDataSender from "./TransactionDataSender.js";
import SynchronizedRecordsReceiver from "./SynchronizedRecordsReceiver.js";
import TransactionSynchronizationValidator from "./TransactionSynchronizationValidator.js";

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

export default TransactionSynchronizationService;