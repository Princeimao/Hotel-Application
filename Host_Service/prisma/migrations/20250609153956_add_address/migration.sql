/*
  Warnings:

  - Added the required column `city` to the `Host` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Host` table without a default value. This is not possible if the table is not empty.
  - Added the required column `houseAddress` to the `Host` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pincode` to the `Host` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Host` table without a default value. This is not possible if the table is not empty.
  - Made the column `profileImage` on table `Host` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Host" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "houseAddress" TEXT NOT NULL,
ADD COLUMN     "pincode" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ALTER COLUMN "profileImage" SET NOT NULL;
