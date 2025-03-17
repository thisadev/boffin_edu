// Script to apply the fileSize column migration to the production database
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

async function main() {
  console.log('Starting database migration...');
  
  const prisma = new PrismaClient();
  
  try {
    // Read the SQL migration file
    const sqlPath = path.join(__dirname, '..', 'prisma', 'add_file_size_column.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Execute the raw SQL query
    console.log('Executing SQL migration...');
    await prisma.$executeRawUnsafe(sql);
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Error applying migration:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
