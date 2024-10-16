CREATE TABLE graceful.product_custom_price
(
    id         UUID,
    version    INTEGER      NOT NULL,
    name       VARCHAR(255) NOT NULL,
    price      INTEGER      NOT NULL
);
ALTER TABLE graceful.product_custom_price
    ADD CONSTRAINT product_custom_price_pk PRIMARY KEY (id),
    ADD CONSTRAINT product_custom_price_name_unique UNIQUE (name);

ALTER TABLE graceful.products
    ADD COLUMN custom_price_id UUID;
ALTER TABLE graceful.products
    ADD CONSTRAINT products_custom_price_fk FOREIGN KEY (custom_price_id) REFERENCES graceful.product_custom_price (id);
CREATE INDEX products_custom_price_fk ON graceful.products (custom_price_id);