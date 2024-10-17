ALTER TABLE graceful.product_rating
    DROP CONSTRAINT product_rating_product_id_fk,
    DROP COLUMN product_id;
DROP INDEX IF EXISTS graceful.product_rating_product_id_idx;

ALTER TABLE graceful.product_rating
    RENAME TO order_rating;
ALTER TABLE graceful.product_rating_images
    RENAME TO order_rating_images;

ALTER TABLE graceful.order_rating_images
    DROP CONSTRAINT product_rating_images_product_rating_fk,
    ADD CONSTRAINT order_rating_images_order_rating_fk FOREIGN KEY (product_rating) REFERENCES graceful.order_rating (id);
-- Update the index in the renamed table
DROP INDEX IF EXISTS graceful.product_rating_images_product_rating_idx;
CREATE INDEX order_rating_images_order_rating_idx ON graceful.order_rating_images (product_rating);

CREATE TABLE graceful.order_rating_product
(
    id              UUID    NOT NULL,
    version         INTEGER NOT NULL,
    order_rating_id UUID    NOT NULL,
    product_id      UUID    NOT NULL
);
ALTER TABLE graceful.order_rating_product
    ADD CONSTRAINT order_rating_product_pk PRIMARY KEY (id),
    ADD CONSTRAINT order_rating_product_order_rating_fk FOREIGN KEY (order_rating_id) REFERENCES graceful.order_rating (id),
    ADD CONSTRAINT order_rating_product_product_fk FOREIGN KEY (product_id) REFERENCES graceful.products (id);
CREATE INDEX order_rating_product_order_rating_idx ON graceful.order_rating_product (order_rating_id);
CREATE INDEX order_rating_product_product_idx ON graceful.order_rating_product (product_id);