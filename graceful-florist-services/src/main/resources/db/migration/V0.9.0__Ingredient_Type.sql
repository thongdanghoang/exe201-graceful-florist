ALTER TABLE graceful.ingredients
    ADD COLUMN type  VARCHAR(64) NOT NULL default 'MAIN_FLOWER',
    ADD COLUMN price INTEGER     NOT NULL default 0;