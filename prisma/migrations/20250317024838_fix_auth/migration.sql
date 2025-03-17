-- Fix authentication issues by removing the admin@boffininstitute.com user
-- and ensuring proper account linking for Google authentication

-- First, delete any sessions associated with the admin user
DELETE FROM "sessions" WHERE "user_id" IN (SELECT id FROM "users" WHERE email = 'admin@boffininstitute.com');

-- Delete any accounts associated with the admin user
DELETE FROM "accounts" WHERE "user_id" IN (SELECT id FROM "users" WHERE email = 'admin@boffininstitute.com');

-- Finally, delete the admin user itself
DELETE FROM "users" WHERE email = 'admin@boffininstitute.com';