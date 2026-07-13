INSERT INTO menu_items
(restaurant_id, name, price, category, image_url, is_available)
VALUES

-- Restaurant 1 : Pizza Palace
(1, 'Margherita Pizza', 11.5, 'Pizzas', 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=900&q=80', TRUE),
(1, 'Pepperoni Pizza', 12.8, 'Pizzas', 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=80', TRUE),
(1, 'Four Cheese Pizza', 13.4, 'Pizzas', 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=900&q=80', TRUE),
(1, 'Truffle Mushroom Pizza', 14.9, 'Pizzas', 'https://images.unsplash.com/photo-1571066811602-716837d681de?auto=format&fit=crop&w=900&q=80', TRUE),
(1, 'Mediterranean Veg Pizza', 12.6, 'Pizzas', 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=900&q=80', TRUE),
(1, 'Prosciutto Rocket Pizza', 15.5, 'Pizzas', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80', TRUE),
(1, 'Seafood Napoli Pizza', 16.2, 'Pizzas', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80', TRUE),

-- Restaurant 2 : Spice Hub
(2, 'Banana Toffee Shake', 5.7, 'Italian', 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=900&q=80', TRUE),
(2, 'Tagliatelle Bolognese', 13.9, 'Italian', 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80', TRUE),
(2, 'Creamy Pesto Gnocchi', 12.7, 'Italian', 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=900&q=80', TRUE),
(2, 'Croque Monsieur', 9.6, 'French', 'https://images.unsplash.com/photo-1481070555726-e2fe8357725c?auto=format&fit=crop&w=900&q=80', TRUE),
(2, 'Ratatouille Bowl', 11.4, 'French', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80', TRUE),
(2, 'Fresh Orange Spritz', 4.7, 'Beverages', 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=80', TRUE),
(2, 'Iced Latte', 4.9, 'Beverages', 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80', TRUE),
(2, 'Gelato Trio Cup', 6.8, 'Ice Cream', 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?auto=format&fit=crop&w=900&q=80', TRUE),
(2, 'Artisan Sourdough', 4.8, 'Breads', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80', TRUE),
(2, 'Butter Croissant Pack', 5.4, 'Breads', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80', TRUE),
(2, 'Greek Feta Salad', 8.7, 'Salads', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80', TRUE),

-- Restaurant 3 : Burger Town
(3, 'Classic Beef Burger', 8.9, 'Burgers', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80', TRUE),
(3, 'Crispy Chicken Burger', 8.4, 'Burgers', 'https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=900&q=80', TRUE),
(3, 'Double Cheddar Burger', 10.5, 'Burgers', 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80', TRUE),
(3, 'Veggie Garden Burger', 7.9, 'Burgers', 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=900&q=80', TRUE),
(3, 'BBQ Bacon Burger', 10.9, 'Burgers', 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=900&q=80', TRUE),
(3, 'Swiss Mushroom Burger', 9.8, 'Burgers', 'https://images.unsplash.com/photo-1598182198871-d3f4ab4fd181?auto=format&fit=crop&w=900&q=80', TRUE),
(3, 'Spicy Jalapeno Burger', 9.2, 'Burgers', 'https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=900&q=80', TRUE),
(3, 'Vanilla Bean Shake', 5.2, 'Milkshakes', 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80', TRUE),
(3, 'Belgian Chocolate Shake', 5.9, 'Milkshakes', 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=900&q=80', TRUE),
(3, 'Strawberry Cherry Shake', 5.6, 'Milkshakes', 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=900&q=80', TRUE),
(3, 'Oreo Crunch Shake', 6.1, 'Milkshakes', 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=900&q=80', TRUE),
(3, 'Caramel Hazelnut Shake', 6.3, 'Milkshakes', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80', TRUE),
(3, 'Pistachio Shake', 6.4, 'Milkshakes', 'https://images.unsplash.com/photo-1568901839119-631418a3910d?auto=format&fit=crop&w=900&q=80', TRUE),
(3, 'Swiss Chocolate Box', 8.5, 'Chocolates', 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=900&q=80', TRUE);

SELECT * FROM menu_items;
