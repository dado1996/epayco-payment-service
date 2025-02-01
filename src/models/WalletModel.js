import { prisma } from "../utils/prisma.js";

export class WalletModel {
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
            phone: true,
          },
        },
      },
    });

    return wallet;
  }
}
