/*
  Warnings:

  - You are about to drop the column `tempToken` on the `Wallets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Transactions` ADD COLUMN `tempToken` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Wallets` DROP COLUMN `tempToken`;
