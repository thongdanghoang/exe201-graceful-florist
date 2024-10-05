ALTER TABLE graceful.products
    ADD COLUMN main_image UUID NOT NULL DEFAULT gen_random_uuid();