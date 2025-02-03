import { randomBytes } from "crypto";
import { prisma } from "../utils/prisma.js";

export class TransactionModel {
  /**
   * Creates a transaction of type "deposit"
   */
  async insertDeposit(data) {
    const transaction = await prisma.transactions.create({
      data: {
        transactionId: randomBytes(16).toString("hex"),
        transactionType: data.transactionType,
        amount: data.amount,
        status: "created",
        walletOriginId: data.walletId,
        walletDestinationId: data.walletId,
      },
      select: {
        transactionId: true,
        transactionType: true,
        status: true,
      },
    });

    return transaction;
  }

  /**
   * Creates a transaction of type "payment"
   */
  async insertPayment(data) {
    const transaction = await prisma.transactions.create({
      data: {
        transactionId: randomBytes(16).toString("hex"),
        transactionType: data.transactionType,
        amount: data.amount,
        status: "pending",
        walletOriginId: data.walletId,
        commerceName: data.commerceName,
        commerceId: data.commerceId,
      },
      select: {
        transactionId: true,
        transactionType: true,
        status: true,
      },
    });

    return transaction;
  }

  /**
   * Updates the status of the transaction
   */
  async updateStatus(transactionId, status) {
    await prisma.transactions.update({
      where: {
        id: transactionId,
      },
      data: {
        status,
      },
    });
  }

  /**
   * Updates the token, either to set it up or to remove it
   */
  async updateToken(id, token) {
    const result = await prisma.transactions.update({
      where: {
        transactionId: id,
      },
      data: {
        tempToken: token,
      },
    });

    return result;
  }

  /**
   * Finds the transaction by the sessionId value
   */
  async findTransactionBySessionId(sessionId) {
    const transaction = await prisma.transactions.findFirst({
      where: {
        transactionId: sessionId,
      },
      select: {
        id: true,
        transactionId: true,
        amount: true,
        commerceId: true,
        commerceName: true,
        tempToken: true,
        status: true,
        walletOrigin: {
          select: {
            id: true,
            balance: true,
          },
        },
      },
    });

    return transaction;
  }
}
