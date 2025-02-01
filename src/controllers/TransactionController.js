import { TransactionModel } from "../models/TransactionModel.js";

export class TransactionController {
  async createTransaction(type, amount, recipientsData) {
    const transactionModel = new TransactionModel();
    let transaction;
    if (type === "deposit") {
      transaction = await transactionModel.insertDeposit({
        transactionType: "deposit",
        amount: parseFloat(amount),
        walletId: recipientsData.walletId,
      });
    }

    return transaction;
  }
}
