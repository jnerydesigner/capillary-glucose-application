/*
  Warnings:

  - You are about to drop the `CapillaryBloodGlucose` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CapillaryBloodGlucose" DROP CONSTRAINT "CapillaryBloodGlucose_userId_fkey";

-- DropTable
DROP TABLE "CapillaryBloodGlucose";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "capillary_blood_glucose" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "date_time_collect" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER,

    CONSTRAINT "capillary_blood_glucose_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "capillary_blood_glucose" ADD CONSTRAINT "capillary_blood_glucose_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
