import { transporter } from "../utils/nodemailer.js";
import { TransactionModel } from "../models/TransactionModel.js";
import { WalletModel } from "../models/WalletModel.js";

export class TransactionController {
  /**
   *
   * @param {'deposit' | 'payment'} type
   * @param {number} amount
   * @param {{
   *  walletId: number;
   *  commerceName: string;
   *  commerceId: string;
   * }} recipientsData
   * @returns
   */
  async createTransaction(type, amount, recipientsData) {
    const transactionModel = new TransactionModel();
    let transaction;
    if (type === "deposit") {
      transaction = await transactionModel.insertDeposit({
        transactionType: "deposit",
        amount: parseFloat(amount),
        walletId: recipientsData.walletId,
      });
    } else if (type === "payment") {
      transaction = await transactionModel.insertPayment({});
    }

    return transaction;
  }

  /**
   * Setup the payment plan for the
   *
   * @param {{
   *  documentId: string;
   *  phone: string;
   *  value: number;
   *  commerceId: string;
   *  commerceName: string;
   * }} data
   *
   * @returns {{
   *  status: number;
   *  message: string;
   *  data: {
   *    transactionType: string;
   *    status: "created";
   *    sessionId: string;
   *    messageId: string;
   *  };
   * }}
   */
  async payment(data) {
    const walletModel = new WalletModel();

    const wallet = await walletModel.findWalletByDocumentId(data.documentId);
    if (!wallet || wallet.user.phone !== data.phone) {
      return {
        status: 400,
        message: "Wallet associated to document id doesn't exist",
      };
    }

    const transactionModel = new TransactionModel();
    const { transactionId, ...transaction } =
      await transactionModel.insertPayment({
        transactionType: "payment",
        amount: data.value,
        walletId: wallet.id,
        commerceId: data.commerceId,
        commerceName: data.commerceName,
      });

    const token = parseInt(Math.random() * 1000000).toString();
    const subject = "Epayco - Verification Code";
    const text = "This is your verification code: " + token;

    const mailOptions = {
      from: "no-reply@epaycowallet.com",
      to: wallet.user.email,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    await transactionModel.updateToken(transactionId, token);

    return {
      status: 200,
      message: "The email with the unique token has been sent to your email",
      data: {
        ...transaction,
        sessionId: transactionId,
        messageId: info.messageId,
      },
    };
  }

  /**
   * Confirms the payment and charges the wallet
   *
   * @param {string} sessionId
   * @param {number} token
   * @returns {{
   *  status: number;
   *  message: string;
   * }}
   */
  async paymentConfirmation(sessionId, token) {
    const transactionModel = new TransactionModel();
    const walletModel = new WalletModel();

    const { tempToken, ...transaction } =
      await transactionModel.findTransactionBySessionId(sessionId);

    if (!transaction || transaction.status === "completed") {
      return {
        status: 404,
        message: "No transaction found",
      };
    }

    if (tempToken !== token) {
      return {
        status: 401,
        message: "You are not authorized to do this action",
      };
    }

    const newBalance = transaction.walletOrigin.balance - transaction.amount;
    const newBalanceWallet = await walletModel.updateBalance(
      transaction.walletOrigin.id,
      newBalance
    );
    await transactionModel.updateStatus(transaction.transactionId, "completed");
    await transactionModel.updateToken(transaction.transactionId, null);
    delete transaction.walletOrigin;

    return {
      status: 200,
      message: "The balance in your wallet has been updated",
      data: {
        ...transaction,
        wallet: newBalanceWallet,
      },
    };
  }
}
