-- Drops the favorite_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "favorite_db" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect favorite_db --
USE bamazon_db;

-- Creates the table "products" within bamazon_db --
CREATE TABLE products (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  -- Makes a string column called "product_name" which cannot contain null --
  product_name VARCHAR(30) NOT NULL,
 -- Makes a string column called "department_name" which cannot contain null --
  department_name VARCHAR(30) NOT NULL,
  -- Makes an numeric column called "price" --
  price INTEGER(10),
  -- Makes an numeric column called "quantity" --
  quantity INTEGER(10),
  -- Sets id as this table's primary key which means all data contained within it will be unique --
  PRIMARY KEY (id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Honey", "Condiments", 6, 10),
  ("Ketchup", "Condiments", 3, 7),
  ("Mayonnaise", "Condiments", 5, 13),
  ("Mustard", "Condiments", 3, 10),
  ("Tabasco", "Condiments", 6, 19),
  ("Olive Oil", "Condiments", 16, 8),
  ("Ranch", "Condiments", 15, 12),
  ("Honey Mustard", "Condiments", 7, 4),
  ("Tahini", "Condiments", 12, 3),
  ("Date Syrup", "Condiments", 11, 10);