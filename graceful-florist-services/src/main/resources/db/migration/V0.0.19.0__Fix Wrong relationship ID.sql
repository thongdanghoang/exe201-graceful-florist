-- Drop the existing table
DROP TABLE IF EXISTS graceful.order_rating_product;

CREATE TABLE graceful.order_rating_product
(
    order_rating_id UUID    NOT NULL,
    product_id      UUID    NOT NULL
);
ALTER TABLE graceful.order_rating_product
    ADD CONSTRAINT order_rating_product_pk PRIMARY KEY (order_rating_id, product_id),
    ADD CONSTRAINT order_rating_product_order_rating_fk FOREIGN KEY (order_rating_id) REFERENCES graceful.order_rating (id),
    ADD CONSTRAINT order_rating_product_product_fk FOREIGN KEY (product_id) REFERENCES graceful.products (id);
CREATE INDEX order_rating_product_product_idx ON graceful.order_rating_product (product_id);
CREATE INDEX order_rating_product_order_rating_idx ON graceful.order_rating_product (order_rating_id);