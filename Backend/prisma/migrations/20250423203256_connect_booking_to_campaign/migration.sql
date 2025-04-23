/*
  Warnings:

  - You are about to alter the column `spot_id` on the `booking` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `booking` MODIFY `spot_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_spot_id_fkey` FOREIGN KEY (`spot_id`) REFERENCES `Campaign`(`spot_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
