// fix_auth.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('\n=== CHECKING DATABASE FOR AUTH ISSUES ===');
  
  // Check all users
  const users = await prisma.user.findMany();
  console.log('\n=== USERS ===');
  console.table(users.map(u => ({
    id: u.id,
    email: u.email,
    firstName: u.first_name,
    lastName: u.last_name,
    role: u.role
  })));
  
  // Check all accounts
  const accounts = await prisma.account.findMany();
  console.log('\n=== ACCOUNTS ===');
  console.table(accounts.map(a => ({
    id: a.id,
    userId: a.user_id,
    provider: a.provider,
    providerAccountId: a.provider_account_id
  })));
  
  // Check for duplicate emails
  const duplicateEmails = await prisma.$queryRaw`
    SELECT email, COUNT(*) as count FROM users GROUP BY email HAVING COUNT(*) > 1
  `;
  console.log('\n=== DUPLICATE EMAILS ===');
  console.table(duplicateEmails);
  
  // Check for any accounts with email thisaraw@boffin.lk
  const boffinUser = await prisma.user.findUnique({
    where: { email: 'thisaraw@boffin.lk' },
    include: { accounts: true }
  });
  
  console.log('\n=== BOFFIN USER DETAILS ===');
  if (boffinUser) {
    console.log('User exists:', {
      id: boffinUser.id,
      email: boffinUser.email,
      accounts: boffinUser.accounts
    });
    
    // If user exists but has no Google account, let's create one
    if (boffinUser.accounts.length === 0) {
      console.log('User has no accounts. Will need to sign in with Google to create one.');
    }
  } else {
    console.log('No user found with email thisaraw@boffin.lk');
  }
  
  // Fix: Remove any accounts without users
  const orphanedAccounts = await prisma.account.findMany({
    where: {
      user: null
    }
  });
  
  if (orphanedAccounts.length > 0) {
    console.log('\n=== ORPHANED ACCOUNTS FOUND ===');
    console.table(orphanedAccounts);
    
    for (const account of orphanedAccounts) {
      await prisma.account.delete({
        where: { id: account.id }
      });
    }
    console.log(`Deleted ${orphanedAccounts.length} orphaned accounts`);
  } else {
    console.log('\n=== NO ORPHANED ACCOUNTS FOUND ===');
  }
  
  // Fix: Remove any sessions without users
  const orphanedSessions = await prisma.session.findMany({
    where: {
      user: null
    }
  });
  
  if (orphanedSessions.length > 0) {
    console.log('\n=== ORPHANED SESSIONS FOUND ===');
    console.table(orphanedSessions);
    
    for (const session of orphanedSessions) {
      await prisma.session.delete({
        where: { id: session.id }
      });
    }
    console.log(`Deleted ${orphanedSessions.length} orphaned sessions`);
  } else {
    console.log('\n=== NO ORPHANED SESSIONS FOUND ===');
  }
  
  // Fix: Delete the admin@boffininstitute.com user if it exists
  const adminUser = await prisma.user.findUnique({
    where: { email: 'admin@boffininstitute.com' },
    include: { accounts: true, sessions: true }
  });
  
  if (adminUser) {
    console.log('\n=== ADMIN USER FOUND ===');
    console.log(adminUser);
    
    // Delete related sessions
    if (adminUser.sessions && adminUser.sessions.length > 0) {
      await prisma.session.deleteMany({
        where: { user_id: adminUser.id }
      });
      console.log(`Deleted ${adminUser.sessions.length} sessions for admin user`);
    }
    
    // Delete related accounts
    if (adminUser.accounts && adminUser.accounts.length > 0) {
      await prisma.account.deleteMany({
        where: { user_id: adminUser.id }
      });
      console.log(`Deleted ${adminUser.accounts.length} accounts for admin user`);
    }
    
    // Delete the user
    await prisma.user.delete({
      where: { id: adminUser.id }
    });
    console.log('Deleted admin user');
  } else {
    console.log('\n=== NO ADMIN USER FOUND ===');
  }
  
  // Fix: Check for any users with non-boffin.lk emails that have admin role
  const nonBoffinAdmins = await prisma.user.findMany({
    where: {
      role: 'admin',
      NOT: {
        email: {
          endsWith: '@boffin.lk'
        }
      }
    }
  });
  
  if (nonBoffinAdmins.length > 0) {
    console.log('\n=== NON-BOFFIN ADMIN USERS FOUND ===');
    console.table(nonBoffinAdmins);
    
    for (const user of nonBoffinAdmins) {
      // Delete related sessions
      await prisma.session.deleteMany({
        where: { user_id: user.id }
      });
      
      // Delete related accounts
      await prisma.account.deleteMany({
        where: { user_id: user.id }
      });
      
      // Delete the user
      await prisma.user.delete({
        where: { id: user.id }
      });
    }
    console.log(`Deleted ${nonBoffinAdmins.length} non-boffin admin users`);
  } else {
    console.log('\n=== NO NON-BOFFIN ADMIN USERS FOUND ===');
  }
  
  console.log('\n=== AUTH FIX COMPLETED ===');
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
