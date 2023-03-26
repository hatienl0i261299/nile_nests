/*
  Warnings:

  - You are about to drop the column `studentId` on the `Country` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Country" DROP CONSTRAINT "Country_studentId_fkey";

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "studentId";

-- CreateTable
CREATE TABLE "CountriesOnStudents" (
    "studentId" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CountriesOnStudents_pkey" PRIMARY KEY ("studentId","countryId")
);

-- AddForeignKey
ALTER TABLE "CountriesOnStudents" ADD CONSTRAINT "CountriesOnStudents_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountriesOnStudents" ADD CONSTRAINT "CountriesOnStudents_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;
