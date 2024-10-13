DROP TABLE graceful.staffs_orders;
ALTER TABLE graceful.orders
    ADD COLUMN staff_id UUID;
ALTER TABLE graceful.orders
    ADD CONSTRAINT orders_staff_id_fk FOREIGN KEY (staff_id) REFERENCES graceful.users (id);
CREATE INDEX orders_staff_id_idx ON graceful.orders (staff_id);