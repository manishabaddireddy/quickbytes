INSERT INTO users
(name, email, password, phone, address)
VALUES
('John Doe', 'john@example.com', '$2b$10$dummyhashedpassword1', '9876543210', '123 Main Street, New York'),

('Alice Smith', 'alice@example.com', '$2b$10$dummyhashedpassword2', '9876543211', '456 Oak Avenue, Chicago'),

('Robert Brown', 'robert@example.com', '$2b$10$dummyhashedpassword3', '9876543212', '789 Pine Road, Dallas');

SELECT * FROM users;
