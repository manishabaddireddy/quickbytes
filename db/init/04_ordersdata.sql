insert into orders
(user_id, restaurant_id, status, total_amount, delivery_address)
values
(1, 1, 'delivered', 27.98,
 '123 Main Street, New York'),

(2, 2, 'preparing', 26.75,
 '456 Oak Avenue, Chicago'),

(3, 3, 'pending', 8.99,
 '789 Pine Road, Dallas');

 select*from orders;
