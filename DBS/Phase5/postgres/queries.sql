-- Insert data
INSERT INTO users(name, email) VALUES ('Alice', 'alice@example.com');
INSERT INTO products(name, price, stock) VALUES ('Phone', 599.99, 10);

-- Start transaction
BEGIN;

INSERT INTO orders(user_id) VALUES (1);
INSERT INTO order_items(order_id, product_id, quantity, price) VALUES (1, 1, 2, 599.99);

COMMIT;

-- Update
UPDATE products SET stock = stock - 2 WHERE id = 1;

-- Delete
DELETE FROM order_items WHERE id = 1;

-- Join query
SELECT o.id, u.name, p.name, oi.quantity
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id;

-- Group by
SELECT user_id, COUNT(*) AS order_count
FROM orders
GROUP BY user_id;

-- Use view
SELECT * FROM order_summary;
