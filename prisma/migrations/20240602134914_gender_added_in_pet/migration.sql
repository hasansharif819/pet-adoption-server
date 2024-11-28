-- CreateEnum
CREATE TYPE "PetGender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "gender" "PetGender" NOT NULL DEFAULT 'MALE';
