import { prisma } from "../utils/prisma.js";

export class WalletModel {
  /**
   * Creates a new wallet
   */
  async insertWallet(userId) {
    const wallet = await prisma.wallets.create({
      data: {
        userId,
      },
      select: {
        walletId: true,
        balance: true,
      },
    });

    return wallet;
  }

  /**
   * Updates the balance of the wallet of the wallet id passed by
   */
  async updateBalance(id, newBalance) {
    const result = await prisma.wallets.update({
      where: {
        id,
      },
      data: {
        balance: newBalance,
      },
      select: {
        walletId: true,
        balance: true,
        user: {
          select: {
            documentId: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return result;
  }

  /**
   * Finds and retrieves the wallet by using the documentId value
   */
  async findWalletByDocumentId(documentId) {
    const wallet = await prisma.wallets.findFirst({
      where: {
        user: {
          documentId,
        },
      },
      select: {
        id: true,
        walletId: true,
        balance: true,
        user: {
          select: {
            email: true,
            phone: true,
          },
        },
      },
    });

    return wallet;
  }
}
