ALTER TABLE graceful.orders
    ADD COLUMN delivery_date      DATE NOT NULL DEFAULT CURRENT_DATE,
    ADD COLUMN delivery_time_from TIME NOT NULL DEFAULT '09:00:00',
    ADD COLUMN delivery_time_to   TIME,
    ADD COLUMN message            TEXT;