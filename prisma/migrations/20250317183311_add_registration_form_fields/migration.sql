/*
  Warnings:

  - You are about to drop the column `fileSize` on the `media_assets` table. All the data in the column will be lost.
  - Added the required column `file_size` to the `media_assets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_of_birth` to the `registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `field_of_study` to the `registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `highest_qualification` to the `registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institution` to the `registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_method` to the `registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `registrations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "media_assets" DROP COLUMN "fileSize",
ADD COLUMN     "file_size" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "registrations" ADD COLUMN     "address" VARCHAR(255) NOT NULL,
ADD COLUMN     "city" VARCHAR(100) NOT NULL,
ADD COLUMN     "date_of_birth" VARCHAR(20) NOT NULL,
ADD COLUMN     "email" VARCHAR(255) NOT NULL,
ADD COLUMN     "employer" VARCHAR(255),
ADD COLUMN     "employment_status" VARCHAR(50),
ADD COLUMN     "field_of_study" VARCHAR(255) NOT NULL,
ADD COLUMN     "first_name" VARCHAR(100) NOT NULL,
ADD COLUMN     "gender" VARCHAR(20) NOT NULL,
ADD COLUMN     "highest_qualification" VARCHAR(100) NOT NULL,
ADD COLUMN     "institution" VARCHAR(255) NOT NULL,
ADD COLUMN     "job_title" VARCHAR(100),
ADD COLUMN     "last_name" VARCHAR(100) NOT NULL,
ADD COLUMN     "payment_method" VARCHAR(50) NOT NULL,
ADD COLUMN     "phone" VARCHAR(50) NOT NULL,
ADD COLUMN     "postal_code" VARCHAR(20) NOT NULL,
ADD COLUMN     "year_of_completion" VARCHAR(10),
ADD COLUMN     "years_of_experience" VARCHAR(10);
