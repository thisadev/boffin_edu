/*
  Warnings:

  - You are about to drop the column `file_size` on the `media_assets` table. All the data in the column will be lost.
  - Added the required column `fileSize` to the `media_assets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "testimonials" DROP CONSTRAINT "testimonials_registration_id_fkey";

-- DropIndex
DROP INDEX "media_assets_media_type_idx";

-- DropIndex
DROP INDEX "media_assets_uploaded_by_id_idx";

-- DropIndex
DROP INDEX "media_placeholders_context_idx";

-- DropIndex
DROP INDEX "media_placeholders_placeholder_type_idx";

-- AlterTable
ALTER TABLE "media_assets" DROP COLUMN "file_size",
ADD COLUMN     "fileSize" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "testimonials" ALTER COLUMN "designation" SET DATA TYPE TEXT,
ALTER COLUMN "workplace" SET DATA TYPE TEXT,
ALTER COLUMN "university" SET DATA TYPE TEXT,
ALTER COLUMN "profile_image_url" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "email_verified" TIMESTAMPTZ(6),
ADD COLUMN     "image" VARCHAR(255);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- AddForeignKey
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_registration_id_fkey" FOREIGN KEY ("registration_id") REFERENCES "registrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
