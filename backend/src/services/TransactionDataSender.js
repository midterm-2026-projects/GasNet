//week3-day1
class TransactionDataSender {
  send(transaction) {
    return {
      success: true,
      message: "Transaction data sent successfully.",
      transaction,
    };
  }
}

export default TransactionDataSender;