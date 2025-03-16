-- CreateTable
CREATE TABLE "testimonials" (
  "id" TEXT NOT NULL,
  "registration_id" INTEGER NOT NULL,
  "content" TEXT NOT NULL,
  "rating" INTEGER NOT NULL,
  "designation" VARCHAR(255),
  "workplace" VARCHAR(255),
  "university" VARCHAR(255),
  "profile_image_url" VARCHAR(255),
  "is_active" BOOLEAN NOT NULL DEFAULT true,
  "is_featured" BOOLEAN NOT NULL DEFAULT false,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_registration_id_fkey" FOREIGN KEY ("registration_id") REFERENCES "registrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
