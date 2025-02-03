import { json } from "stream/consumers";
import { WalletModel } from "../models/WalletModel.js";
import { TransactionController } from "./TransactionController.js";

export class WalletController {
  /**
   *
   * @param {{
   *  documentId: string;
   *  phone: string;
   *  amount: number;
   * }} data
   * @returns {Promise<{
   *  status: number;
   *  message: string;
   *  data: {
   *
   *  }
   * }>}
   */
  async walletDeposit(data) {
    const walletModel = new WalletModel();
    const transactionController = new TransactionController();

    const wallet = await walletModel.findWalletByDocumentId(data.documentId);
    if (!wallet || wallet.user.phone !== data.phone) {
      return {
        status: 400,
        message: "Wallet associated to document id doesn't exist",
      };
    }

    const newBalance = parseFloat(data.amount) + wallet.balance;

    const walletUpdatedBalance = await walletModel.updateBalance(
      wallet.id,
      newBalance
    );
    const transaction = transactionController.createTransaction(
      "deposit",
      data.amount,
      { walletId: wallet.id }
    );
    return {
      status: 200,
      message: "Balance has been updated succesfully",
      data: {
        ...walletUpdatedBalance,
        ...transaction,
      },
    };
  }

  /**
   *  Retrieves the balance of the wallet
   *
   * @param {{
   *  documentId: string;
   *  phone: string;
   * }} data
   * @returns {Promise<{
   *  status: number;
   *  message: string;
   *  data: {
   *    walletId: string;
   *    balance: number;
   *  }
   * }>}
   */
  async checkBalance(data) {
    const { documentId, phone } = data;
    const walletModel = new WalletModel();

    const wallet = await walletModel.findWalletByDocumentId(documentId);
    if (!wallet || wallet.user.phone !== phone) {
      return {
        status: 400,
        message: "Wallet associated with document id doesn't exists",
      };
    }

    delete wallet.id;
    delete wallet.user;

    return {
      status: 200,
      message: "Data retrieved succesfully",
      data: wallet,
    };
  }

  /**
   *
   * @param {number} offset
   * @returns {Promise<{
   *  status: number;
   *  message: string;
   *  data: {
   *    id: number;
   *    walletId: string;
   *    balance: number;
   *    user: {
   *      fullName: string;
   *    };
   *  }
   * }>}
   */
  async findAll(offset) {
    const walletModel = new WalletModel();
    const wallets = await walletModel.findAll(offset);

    return {
      status: 200,
      message: "Wallets found succesfully",
      data: wallets,
    };
  }
}
