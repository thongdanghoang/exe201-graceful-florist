insert into graceful.products(id, version, created_date, created_by, last_modified_date, last_modified_by, name, description, price, enabled)
values
    (gen_random_uuid(), 0, now(), 'admin', now(), 'admin', 'Dịu Dàng Yêu Thương', '',100, true),
    (gen_random_uuid(), 0, now(), 'admin', now(), 'admin', 'Vẻ đẹp Vĩnh Cửu', '',100, true),
    (gen_random_uuid(), 0, now(), 'admin', now(), 'admin', 'Chung Thủy Vĩnh Viễn', '',100, true),
    (gen_random_uuid(), 0, now(), 'admin', now(), 'admin', 'Nụ hôn Nồng Nàn', '',100, true),
    (gen_random_uuid(), 0, now(), 'admin', now(), 'admin', 'Lời Thì Thầm của Trái Tim', '',100, true),
    (gen_random_uuid(), 0, now(), 'admin', now(), 'admin', 'Hoa ly trắng', '',100, false),
    (gen_random_uuid(), 0, now(), 'admin', now(), 'admin', 'Hoa lan tím', '',100, false),
    (gen_random_uuid(), 0, now(), 'admin', now(), 'admin', 'Hoa cúc vàng', '',100, false);
