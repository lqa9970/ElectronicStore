CREATE DATABASE test;
\ c test;
DROP TABLE IF EXISTS users,
admins,
products,
orders CASCADE;
CREATE EXTENSION "uuid-ossp";
CREATE TABLE admins (
    admin_id: UUID NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(70) NOT NULL,
    role VARCHAR(10)
);
CREATE TABLE users (
    user_id UUID NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(70) NOT NULL,
    role VARCHAR(10)
);
CREATE TABLE products (
    product_id UUID NOT NULL,
    product_name VARCHAR(50),
    description VARCHAR(600),
    price int,
    quantity int,
    categories VARCHAR(20) []
);
CREATE TABLE orders (
    order_id UUID NOT NULL,
    user UUID,
    products VARCHAR(50) []
);
INSERT INTO users (user_id, first_name, last_name, email, role)
values (
        uuid_generate_v4(),
        'Quang Anh',
        'Le',
        'abc@abc.abc',
        'USER'
    ) (
        uuid_generate_v4(),
        'Doraemon',
        'Dora',
        'dora@daro.com',
        'USER'
    ) (
        uuid_generate_v4(),
        'Bully',
        'Maguire',
        'black@spider.com',
        'USER'
    ) (
        uuid_generate_v4(),
        'John',
        'Beng',
        'johnjohn@gmail.com',
        'USER'
    );
INSERT INTO users (user_id, first_name, last_name, email, role)
values (
        uuid_generate_v4(),
        'Quang Anh',
        'Le',
        'anhlequang1998@gmail.com',
        'ADMIN'
    ) (
        uuid_generate_v4(),
        'Quang Anh',
        'Leeeee',
        'quanganh.le@integrify.io',
        'ADMIN'
    );
INSERT INTO products (
        product_id,
        product_name,
        description,
        price,
        quantity,
        categories
    )
values (
        product_id uuid_generate_v4(),
        product_name 'ABC Smart Watch',
        description 'Best watch in the universe',
        price 699,
        quantity 30,
        categories '{"Watch","Electric Device", "Expensive"}'
    ) (
        product_id uuid_generate_v4(),
        product_name 'ABD Smart Book ',
        description 'Best book/tablet in the universe',
        price 999,
        quantity 20,
        categories '{"Book","Electric Device", "Expensive"}'
    ) (
        product_id uuid_generate_v4(),
        product_name 'ABE Smart Spoon',
        description 'Just a spoon but Best spoon in the universe',
        price 199,
        quantity 20,
        categories '{"Spoon","Electric Device"}'
    ) (
        product_id uuid_generate_v4(),
        product_name 'ABF Smart TV',
        description 'Best electric TV in the universe',
        price 1699,
        quantity 10,
        categories '{"Tivo","Electric Device", "Expensive++"}'
    )