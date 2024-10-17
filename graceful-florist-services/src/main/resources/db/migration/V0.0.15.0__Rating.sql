CREATE TABLE graceful.product_rating
(
    id                 UUID,
    version            INTEGER     NOT NULL,
    created_date       TIMESTAMP   NOT NULL,
    created_by         VARCHAR(64) NOT NULL,
    last_modified_date TIMESTAMP   NOT NULL,
    last_modified_by   VARCHAR(64) NOT NULL,
    user_id            UUID        NOT NULL,
    product_id         UUID        NOT NULL,
    order_id           UUID        NOT NULL,
    rating             INTEGER     NOT NULL,
    anonymous          BOOLEAN     NOT NULL,
    description        TEXT        NOT NULL
);
ALTER TABLE graceful.product_rating
    ADD CONSTRAINT product_rating_pk PRIMARY KEY (id),
    ADD CONSTRAINT product_rating_user_id_fk FOREIGN KEY (user_id) REFERENCES graceful.users (id),
    ADD CONSTRAINT product_rating_product_id_fk FOREIGN KEY (product_id) REFERENCES graceful.products (id),
    ADD CONSTRAINT product_rating_order_id_fk FOREIGN KEY (order_id) REFERENCES graceful.orders (id);
CREATE INDEX product_rating_user_id_idx ON graceful.product_rating (user_id);
CREATE INDEX product_rating_product_id_idx ON graceful.product_rating (product_id);
CREATE INDEX product_rating_order_id_idx ON graceful.product_rating (order_id);

CREATE TABLE graceful.product_rating_images
(
    id             UUID    NOT NULL,
    version        INTEGER NOT NULL,
    product_rating UUID    NOT NULL,
    image          UUID    NOT NULL
);
ALTER TABLE graceful.product_rating_images
    ADD CONSTRAINT product_rating_images_pk PRIMARY KEY (id),
    ADD CONSTRAINT product_rating_images_product_rating_fk FOREIGN KEY (product_rating) REFERENCES graceful.product_rating (id);
CREATE INDEX product_rating_images_product_rating_idx ON graceful.product_rating_images (product_rating);