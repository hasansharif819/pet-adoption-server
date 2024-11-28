/*
  Warnings:

  - The `temperament` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `medicalHistory` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `adoptionRequirements` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "temperament",
ADD COLUMN     "temperament" TEXT[],
DROP COLUMN "medicalHistory",
ADD COLUMN     "medicalHistory" TEXT[],
DROP COLUMN "adoptionRequirements",
ADD COLUMN     "adoptionRequirements" TEXT[];
