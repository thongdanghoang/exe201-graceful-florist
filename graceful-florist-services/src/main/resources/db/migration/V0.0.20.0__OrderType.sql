ALTER TABLE graceful.orders
    ADD COLUMN TYPE VARCHAR(255) NOT NULL DEFAULT 'NORMAL';

UPDATE graceful.orders
SET TYPE = 'SPECIAL'
WHERE id IN (SELECT oi.order_id
             FROM graceful.order_items oi
             WHERE oi.product_id IN (SELECT p.id
                                     FROM graceful.products p
                                     WHERE p.owner_id IS NOT NULL));

ALTER TABLE graceful.orders
    ADD CONSTRAINT orders_type_check CHECK (TYPE IN ('NORMAL', 'SPECIAL'));