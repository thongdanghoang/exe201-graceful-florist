CREATE TABLE graceful.products
(
    id                 UUID,
    version            INTEGER      NOT NULL,
    created_date       TIMESTAMP    NOT NULL,
    created_by         VARCHAR(64)  NOT NULL,
    last_modified_date TIMESTAMP    NOT NULL,
    last_modified_by   VARCHAR(64)  NOT NULL,
    name               VARCHAR(255) NOT NULL,
    description        TEXT,
    price              INTEGER      NOT NULL,
    enabled            BOOLEAN      NOT NULL,
    images             TEXT
);
ALTER TABLE graceful.products
    ADD CONSTRAINT products_pk PRIMARY KEY (id),
    ADD CONSTRAINT products_name_unique UNIQUE (name);

CREATE TABLE graceful.categories
(
    id                 UUID,
    version            INTEGER      NOT NULL,
    created_date       TIMESTAMP    NOT NULL,
    created_by         VARCHAR(64)  NOT NULL,
    last_modified_date TIMESTAMP    NOT NULL,
    last_modified_by   VARCHAR(64)  NOT NULL,
    name               VARCHAR(255) NOT NULL,
    type               VARCHAR(64)  NOT NULL,
    enabled            BOOLEAN      NOT NULL
);
ALTER TABLE graceful.categories
    ADD CONSTRAINT categories_pk PRIMARY KEY (id),
    ADD CONSTRAINT categories_name_unique UNIQUE (name);
CREATE TABLE graceful.products_categories
(
    product_id  UUID NOT NULL,
    category_id UUID NOT NULL
);
ALTER TABLE graceful.products_categories
    ADD CONSTRAINT products_categories_pk PRIMARY KEY (product_id, category_id),
    ADD CONSTRAINT products_categories_product_id_fk FOREIGN KEY (product_id) REFERENCES graceful.products (id),
    ADD CONSTRAINT products_categories_category_id_fk FOREIGN KEY (category_id) REFERENCES graceful.categories (id);
CREATE INDEX products_categories_product_id_idx ON graceful.products_categories (product_id);
CREATE INDEX products_categories_category_id_idx ON graceful.products_categories (category_id);

CREATE TABLE graceful.ingredients
(
    id                 UUID,
    version            INTEGER      NOT NULL,
    created_date       TIMESTAMP    NOT NULL,
    created_by         VARCHAR(64)  NOT NULL,
    last_modified_date TIMESTAMP    NOT NULL,
    last_modified_by   VARCHAR(64)  NOT NULL,
    name               VARCHAR(255) NOT NULL,
    image              UUID
);
ALTER TABLE graceful.ingredients
    ADD CONSTRAINT ingredients_pk PRIMARY KEY (id),
    ADD CONSTRAINT ingredients_name_unique UNIQUE (name);

CREATE TABLE graceful.products_ingredients
(
    product_id    UUID    NOT NULL,
    ingredient_id UUID    NOT NULL,
    quantity      INTEGER NOT NULL
);
ALTER TABLE graceful.products_ingredients
    ADD CONSTRAINT products_ingredients_pk PRIMARY KEY (product_id, ingredient_id),
    ADD CONSTRAINT products_ingredients_product_id_fk FOREIGN KEY (product_id) REFERENCES graceful.products (id),
    ADD CONSTRAINT products_ingredients_ingredient_id_fk FOREIGN KEY (ingredient_id) REFERENCES graceful.ingredients (id);
CREATE INDEX products_ingredients_product_id_idx ON graceful.products_ingredients (product_id);
CREATE INDEX products_ingredients_ingredient_id_idx ON graceful.products_ingredients (ingredient_id);

CREATE TABLE graceful.shipping_prices
(
    id                 UUID,
    version            INTEGER      NOT NULL,
    created_date       TIMESTAMP    NOT NULL,
    created_by         VARCHAR(64)  NOT NULL,
    last_modified_date TIMESTAMP    NOT NULL,
    last_modified_by   VARCHAR(64)  NOT NULL,
    name               VARCHAR(255) NOT NULL,
    price              INTEGER      NOT NULL
);
ALTER TABLE graceful.shipping_prices
    ADD CONSTRAINT shipping_prices_pk PRIMARY KEY (id),
    ADD CONSTRAINT shipping_prices_name_unique UNIQUE (name);

CREATE TABLE graceful.promotions
(
    id                 UUID,
    version            INTEGER      NOT NULL,
    created_date       TIMESTAMP    NOT NULL,
    created_by         VARCHAR(64)  NOT NULL,
    last_modified_date TIMESTAMP    NOT NULL,
    last_modified_by   VARCHAR(64)  NOT NULL,
    name               VARCHAR(255) NOT NULL,
    description        TEXT,
    discount           FLOAT        NOT NULL,
    quantity           INTEGER      NOT NULL
);
ALTER TABLE graceful.promotions
    ADD CONSTRAINT promotions_pk PRIMARY KEY (id),
    ADD CONSTRAINT promotions_name_unique UNIQUE (name);

CREATE TABLE graceful.orders
(
    id                 UUID,
    version            INTEGER      NOT NULL,
    created_date       TIMESTAMP    NOT NULL,
    created_by         VARCHAR(64)  NOT NULL,
    last_modified_date TIMESTAMP    NOT NULL,
    last_modified_by   VARCHAR(64)  NOT NULL,
    customer_id        UUID         NOT NULL,
    shipping_price_id  UUID         NOT NULL,
    promotion_id       UUID,
    status             VARCHAR(255) NOT NULL,
    total_price        BIGINT       NOT NULL,
    sender_name        VARCHAR(255) NOT NULL,
    sender_phone       VARCHAR(15)  NOT NULL,
    recipient_name     VARCHAR(255) NOT NULL,
    recipient_phone    VARCHAR(15)  NOT NULL,
    recipient_address  TEXT         NOT NULL,
    payment_method     VARCHAR(64)  NOT NULL
);
ALTER TABLE graceful.orders
    ADD CONSTRAINT orders_pk PRIMARY KEY (id),
    ADD CONSTRAINT orders_customer_id_fk FOREIGN KEY (customer_id) REFERENCES graceful.users (id),
    ADD CONSTRAINT orders_shipping_price_id_fk FOREIGN KEY (shipping_price_id) REFERENCES graceful.shipping_prices (id),
    ADD CONSTRAINT orders_promotion_id_fk FOREIGN KEY (promotion_id) REFERENCES graceful.promotions (id);
CREATE INDEX orders_customer_id_idx ON graceful.orders (customer_id);
CREATE INDEX orders_shipping_price_id_idx ON graceful.orders (shipping_price_id);
CREATE INDEX orders_promotion_id_idx ON graceful.orders (promotion_id);

CREATE TABLE graceful.order_items
(
    id          UUID    NOT NULL,
    version     INTEGER NOT NULL,
    order_id    UUID    NOT NULL,
    product_id  UUID    NOT NULL,
    quantity    INTEGER NOT NULL,
    price       INTEGER NOT NULL,
    total_price INTEGER NOT NULL
);
ALTER TABLE graceful.order_items
    ADD CONSTRAINT order_items_pk PRIMARY KEY (id),
    ADD CONSTRAINT order_items_order_id_fk FOREIGN KEY (order_id) REFERENCES graceful.orders (id),
    ADD CONSTRAINT order_items_product_id_fk FOREIGN KEY (product_id) REFERENCES graceful.products (id);
CREATE INDEX order_items_order_id_idx ON graceful.order_items (order_id);
CREATE INDEX order_items_product_id_idx ON graceful.order_items (product_id);

CREATE TABLE graceful.feedbacks
(
    id                 UUID,
    version            INTEGER     NOT NULL,
    created_date       TIMESTAMP   NOT NULL,
    created_by         VARCHAR(64) NOT NULL,
    last_modified_date TIMESTAMP   NOT NULL,
    last_modified_by   VARCHAR(64) NOT NULL,
    user_id            UUID        NOT NULL,
    product_id         UUID        NOT NULL,
    reply_id           UUID,
    content            TEXT        NOT NULL,
    rating             INTEGER     NOT NULL
);
ALTER TABLE graceful.feedbacks
    ADD CONSTRAINT feedbacks_pk PRIMARY KEY (id),
    ADD CONSTRAINT feedbacks_user_id_fk FOREIGN KEY (user_id) REFERENCES graceful.users (id),
    ADD CONSTRAINT feedbacks_product_id_fk FOREIGN KEY (product_id) REFERENCES graceful.products (id),
    ADD CONSTRAINT feedbacks_reply_id_fk FOREIGN KEY (reply_id) REFERENCES graceful.feedbacks (id);
CREATE INDEX feedbacks_user_id_idx ON graceful.feedbacks (user_id);
CREATE INDEX feedbacks_product_id_idx ON graceful.feedbacks (product_id);
CREATE INDEX feedbacks_reply_id_idx ON graceful.feedbacks (reply_id);

CREATE TABLE graceful.transactions
(
    id                 UUID,
    version            INTEGER     NOT NULL,
    created_date       TIMESTAMP   NOT NULL,
    created_by         VARCHAR(64) NOT NULL,
    last_modified_date TIMESTAMP   NOT NULL,
    last_modified_by   VARCHAR(64) NOT NULL,
    order_id           UUID        NOT NULL
);
ALTER TABLE graceful.transactions
    ADD CONSTRAINT transactions_pk PRIMARY KEY (id),
    ADD CONSTRAINT transactions_order_id_fk FOREIGN KEY (order_id) REFERENCES graceful.orders (id);