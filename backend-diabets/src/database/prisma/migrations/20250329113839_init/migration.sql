-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CapillaryBloodGlucose" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "dateTimeCollect" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "CapillaryBloodGlucose_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "CapillaryBloodGlucose" ADD CONSTRAINT "CapillaryBloodGlucose_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
