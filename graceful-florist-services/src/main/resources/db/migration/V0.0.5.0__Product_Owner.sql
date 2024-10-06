ALTER TABLE graceful.products
    ADD COLUMN owner_id UUID REFERENCES graceful.users(id);