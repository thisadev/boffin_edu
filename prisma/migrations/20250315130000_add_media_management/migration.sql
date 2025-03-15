-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO', 'DOCUMENT', 'AUDIO');

-- CreateEnum
CREATE TYPE "PlaceholderType" AS ENUM (
  'LOGO', 
  'FAVICON', 
  'FULL_LOGO', 
  'PARTNERSHIP_LOGO', 
  'ACCREDITATION_LOGO', 
  'COURSE_LOGO', 
  'COURSE_IMAGE', 
  'TESTIMONIAL_IMAGE', 
  'PROMO_VIDEO', 
  'HERO_BACKGROUND', 
  'OTHER'
);

-- CreateTable
CREATE TABLE "media_assets" (
  "id" TEXT NOT NULL,
  "file_name" VARCHAR(255) NOT NULL,
  "original_file_name" VARCHAR(255) NOT NULL,
  "file_size" INTEGER NOT NULL,
  "media_type" "MediaType" NOT NULL,
  "mime_type" VARCHAR(100) NOT NULL,
  "storage_path" VARCHAR(500) NOT NULL,
  "public_url" VARCHAR(500) NOT NULL,
  "alt_text" VARCHAR(255),
  "title" VARCHAR(255),
  "description" TEXT,
  "width" INTEGER,
  "height" INTEGER,
  "duration" INTEGER,
  "uploaded_by_id" INTEGER NOT NULL,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "media_assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_placeholders" (
  "id" SERIAL NOT NULL,
  "name" VARCHAR(100) NOT NULL,
  "description" TEXT,
  "placeholder_type" "PlaceholderType" NOT NULL,
  "context" VARCHAR(100),
  "context_id" TEXT,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "media_placeholders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_placeholder_assignments" (
  "placeholder_id" INTEGER NOT NULL,
  "media_asset_id" TEXT NOT NULL,
  "is_active" BOOLEAN NOT NULL DEFAULT true,
  "order_index" INTEGER NOT NULL DEFAULT 0,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "media_placeholder_assignments_pkey" PRIMARY KEY ("placeholder_id","media_asset_id")
);

-- AddForeignKey
ALTER TABLE "media_assets" ADD CONSTRAINT "media_assets_uploaded_by_id_fkey" FOREIGN KEY ("uploaded_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_placeholder_assignments" ADD CONSTRAINT "media_placeholder_assignments_placeholder_id_fkey" FOREIGN KEY ("placeholder_id") REFERENCES "media_placeholders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_placeholder_assignments" ADD CONSTRAINT "media_placeholder_assignments_media_asset_id_fkey" FOREIGN KEY ("media_asset_id") REFERENCES "media_assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Create indexes
CREATE INDEX "media_assets_media_type_idx" ON "media_assets"("media_type");
CREATE INDEX "media_assets_uploaded_by_id_idx" ON "media_assets"("uploaded_by_id");
CREATE INDEX "media_placeholders_placeholder_type_idx" ON "media_placeholders"("placeholder_type");
CREATE INDEX "media_placeholders_context_idx" ON "media_placeholders"("context", "context_id");
