/*
  Warnings:

  - Made the column `description` on table `Tweet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Tweet` MODIFY `description` LONGTEXT NOT NULL;
