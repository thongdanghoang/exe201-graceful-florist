INSERT INTO graceful.product_custom_price (id, version, name, price)
VALUES (gen_random_uuid(), 0, 'Hoa bó kiểu ( < 15 bông )', 100000),
       (gen_random_uuid(), 0, 'Hoa bó kiểu ( > 15 bông )', 150000),
       (gen_random_uuid(), 0, 'Hoa cắm kệ', 300000),
       (gen_random_uuid(), 0, 'Hoa cắm hộp', 150000),
       (gen_random_uuid(), 0, 'Hoa cắm giỏ', 150000),
       (gen_random_uuid(), 0, 'Hoa cắm bàn tiệc', -1),
       (gen_random_uuid(), 0, 'Hoa cắm sự kiện', -1);