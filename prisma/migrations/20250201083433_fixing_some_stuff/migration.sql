/*
  Warnings:

  - A unique constraint covering the columns `[transactionId]` on the table `Transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Transactions_transactionId_key` ON `Transactions`(`transactionId`);
