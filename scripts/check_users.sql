-- Check all users
SELECT id, email, "first_name", "last_name", role FROM users;

-- Check all accounts
SELECT id, "user_id", provider, "provider_account_id" FROM accounts;

-- Check for any accounts linked to admin@boffininstitute.com
SELECT a.id, a.provider, a."provider_account_id", u.email 
FROM accounts a 
JOIN users u ON a."user_id" = u.id 
WHERE u.email = 'admin@boffininstitute.com';

-- Check for any users with @boffin.lk email domain
SELECT id, email, "first_name", "last_name", role FROM users
WHERE email LIKE '%@boffin.lk';

-- Check for any Google accounts
SELECT a.id, a.provider, a."provider_account_id", u.email 
FROM accounts a 
JOIN users u ON a."user_id" = u.id 
WHERE a.provider = 'google';

-- Check for duplicate emails in users table
SELECT email, COUNT(*) as count FROM users GROUP BY email HAVING COUNT(*) > 1;
