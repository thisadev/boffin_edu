#!/bin/bash

# This script deploys the database schema to Vercel PostgreSQL

echo "🔄 Running database migrations..."
prisma migrate deploy

echo "✅ Database migrations completed successfully!"

echo "🔄 Generating Prisma client..."
prisma generate

echo "✅ Prisma client generated successfully!"

echo "🔄 Seeding the database..."
prisma db seed

echo "✅ Database seeded successfully!"

echo "🎉 Database deployment completed!"
