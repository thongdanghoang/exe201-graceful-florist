CREATE TABLE graceful.cart_item
(
    id                 UUID,
    version            INTEGER      NOT NULL,
    created_date       TIMESTAMP    NOT NULL,
    created_by         VARCHAR(64)  NOT NULL,
    last_modified_date TIMESTAMP    NOT NULL,
    last_modified_by   VARCHAR(64)  NOT NULL,
    user_id            UUID         NOT NULL,
    product_id         UUID         NOT NULL,
    quantity           INTEGER      NOT NULL
);
ALTER TABLE graceful.cart_item
    ADD CONSTRAINT cart_item_pk PRIMARY KEY (id),
    ADD CONSTRAINT cart_item_user_id_fk FOREIGN KEY (user_id) REFERENCES graceful.users (id),
    ADD CONSTRAINT cart_item_product_id_fk FOREIGN KEY (product_id) REFERENCES graceful.products (id);
CREATE INDEX cart_item_user_id_idx ON graceful.cart_item (user_id);
CREATE INDEX cart_item_product_id_idx ON graceful.cart_item (product_id);