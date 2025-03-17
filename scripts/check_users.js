const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkUsers() {
  try {
    // Get all users
    const users = await prisma.user.findMany({
      include: {
        accounts: true
      }
    });

    console.log('\n===== USERS IN DATABASE =====');
    users.forEach(user => {
      console.log(`\nUser ID: ${user.id}`);
      console.log(`Email: ${user.email}`);
      console.log(`Name: ${user.firstName} ${user.lastName}`);
      console.log(`Role: ${user.role}`);
      console.log(`Accounts linked: ${user.accounts.length}`);
      
      if (user.accounts.length > 0) {
        console.log('\nLinked accounts:');
        user.accounts.forEach(account => {
          console.log(`  Provider: ${account.provider}`);
          console.log(`  Provider Account ID: ${account.providerAccountId}`);
        });
      }
    });

    console.log('\n===== TOTAL COUNT =====');
    console.log(`Total users: ${users.length}`);
    
    // Check specifically for admin@boffininstitute.com
    const adminUser = users.find(user => user.email.includes('boffininstitute.com'));
    if (adminUser) {
      console.log('\n⚠️ WARNING: Found user with boffininstitute.com email domain:');
      console.log(`User ID: ${adminUser.id}`);
      console.log(`Email: ${adminUser.email}`);
    } else {
      console.log('\n✅ No users with boffininstitute.com email domain found.');
    }

  } catch (error) {
    console.error('Error checking users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();
