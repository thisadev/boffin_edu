-- Add fileSize column to media_assets table
ALTER TABLE media_assets ADD COLUMN IF NOT EXISTS "file_size" INTEGER;

-- Update existing records to have a default value
UPDATE media_assets SET "file_size" = 0 WHERE "file_size" IS NULL;
