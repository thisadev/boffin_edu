// reset_auth.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('\n=== RESETTING AUTHENTICATION ===');
  
  // 1. Check the current state
  const users = await prisma.user.findMany();
  console.log('\n=== USERS BEFORE RESET ===');
  console.table(users.map(u => ({
    id: u.id,
    email: u.email,
    firstName: u.first_name,
    lastName: u.last_name,
    role: u.role
  })));
  
  // 2. Delete all sessions
  const deletedSessions = await prisma.session.deleteMany({});
  console.log(`Deleted ${deletedSessions.count} sessions`);
  
  // 3. Delete all accounts
  const deletedAccounts = await prisma.account.deleteMany({});
  console.log(`Deleted ${deletedAccounts.count} accounts`);
  
  // 4. Find the boffin.lk user
  const boffinUser = await prisma.user.findFirst({
    where: {
      email: {
        endsWith: '@boffin.lk'
      }
    }
  });
  
  if (boffinUser) {
    console.log(`Found Boffin user: ${boffinUser.email}`);
    
    // Keep this user, but delete all others with admin role
    const deletedNonBoffinAdmins = await prisma.user.deleteMany({
      where: {
        role: 'admin',
        NOT: {
          id: boffinUser.id
        }
      }
    });
    
    console.log(`Deleted ${deletedNonBoffinAdmins.count} non-boffin admin users`);
  } else {
    console.log('No Boffin user found');
  }
  
  // 5. Check the final state
  const finalUsers = await prisma.user.findMany();
  console.log('\n=== USERS AFTER RESET ===');
  console.table(finalUsers.map(u => ({
    id: u.id,
    email: u.email,
    firstName: u.first_name,
    lastName: u.last_name,
    role: u.role
  })));
  
  console.log('\n=== AUTH RESET COMPLETED ===');
  console.log('You can now sign in with your Google account (@boffin.lk)');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
