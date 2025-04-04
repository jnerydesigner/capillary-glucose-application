/*
  Warnings:

  - Added the required column `period` to the `capillary_blood_glucose` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "capillary_blood_glucose" ADD COLUMN     "period" TEXT NOT NULL;
