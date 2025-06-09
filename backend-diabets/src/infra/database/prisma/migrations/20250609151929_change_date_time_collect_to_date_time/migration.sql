/*
  Warnings:

  - Changed the type of `date_time_collect` on the `capillary_blood_glucose` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "capillary_blood_glucose" DROP COLUMN "date_time_collect",
ADD COLUMN     "date_time_collect" TIMESTAMP(3) NOT NULL;
