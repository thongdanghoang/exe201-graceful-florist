CREATE TABLE graceful.staffs_orders
(
    staff_id UUID    NOT NULL,
    order_id UUID    NOT NULL
);
ALTER TABLE graceful.staffs_orders
    ADD CONSTRAINT staffs_orders_pk PRIMARY KEY (staff_id, order_id),
    ADD CONSTRAINT staffs_orders_staff_id_fk FOREIGN KEY (staff_id) REFERENCES graceful.users (id),
    ADD CONSTRAINT staffs_orders_order_id_fk FOREIGN KEY (order_id) REFERENCES graceful.orders (id);
CREATE INDEX staffs_orders_staff_id_idx ON graceful.staffs_orders (staff_id);
CREATE INDEX staffs_orders_order_id_idx ON graceful.staffs_orders (order_id);