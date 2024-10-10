ALTER TABLE graceful.users
    ALTER COLUMN avatar SET DATA TYPE UUID USING avatar::uuid;