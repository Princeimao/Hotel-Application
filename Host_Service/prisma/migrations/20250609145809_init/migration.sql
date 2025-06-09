-- CreateEnum
CREATE TYPE "HostGender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "Host" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "isPhoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "profileImage" TEXT,
    "passwordHash" TEXT,
    "gender" "HostGender" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Host_email_key" ON "Host"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Host_phone_key" ON "Host"("phone");
