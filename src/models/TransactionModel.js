import { randomBytes } from "crypto";
import { prisma } from "../utils/prisma.js";

export class TransactionModel {
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
}
