import { db, restaurantsTable, menuItemsTable } from "./db/index.js";

async function seed() {
  console.log("Seeding...");

  const [restaurant] = await db.insert(restaurantsTable).values({
    name: "QuickBytes",
    address: "12 Grafton Street, Dublin 2",
    cuisine: "International",
    rating: "4.7",
    isOpen: true,
  }).returning();

  console.log("Restaurant created, id:", restaurant.id);

  const items = [
    { name: "Classic Beef Burger", category: "Burgers", price: "8.90", rating: 4.7, imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80" },
    { name: "Crispy Chicken Burger", category: "Burgers", price: "8.40", rating: 4.6, imageUrl: "https://images.unsplash.com/photo-1607730127050-e32a8c756fb9?auto=format&fit=crop&w=900&q=80" },
    { name: "Double Cheddar Burger", category: "Burgers", price: "10.50", rating: 4.8, imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80" },
    { name: "Veggie Garden Burger", category: "Burgers", price: "7.90", rating: 4.5, imageUrl: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=900&q=80" },
    { name: "BBQ Bacon Burger", category: "Burgers", price: "10.90", rating: 4.7, imageUrl: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=900&q=80" },
    { name: "Swiss Mushroom Burger", category: "Burgers", price: "9.80", rating: 4.4, imageUrl: "https://images.unsplash.com/photo-1598182198871-d3f4ab4fd181?auto=format&fit=crop&w=900&q=80" },
    { name: "Spicy Jalapeno Burger", category: "Burgers", price: "9.20", rating: 4.6, imageUrl: "https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=900&q=80" },
    { name: "Margherita Pizza", category: "Pizzas", price: "11.50", rating: 4.8, imageUrl: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=900&q=80" },
    { name: "Pepperoni Pizza", category: "Pizzas", price: "12.80", rating: 4.7, imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=80" },
    { name: "Four Cheese Pizza", category: "Pizzas", price: "13.40", rating: 4.6, imageUrl: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=900&q=80" },
    { name: "Truffle Mushroom Pizza", category: "Pizzas", price: "14.90", rating: 4.7, imageUrl: "https://images.unsplash.com/photo-1571066811602-716837d681de?auto=format&fit=crop&w=900&q=80" },
    { name: "Mediterranean Veg Pizza", category: "Pizzas", price: "12.60", rating: 4.5, imageUrl: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=900&q=80" },
    { name: "Prosciutto Rocket Pizza", category: "Pizzas", price: "15.50", rating: 4.8, imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80" },
    { name: "Seafood Napoli Pizza", category: "Pizzas", price: "16.20", rating: 4.4, imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80" },
    { name: "Vanilla Bean Shake", category: "Milkshakes", price: "5.20", rating: 4.5, imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80" },
    { name: "Belgian Chocolate Shake", category: "Milkshakes", price: "5.90", rating: 4.8, imageUrl: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=900&q=80" },
    { name: "Strawberry Cream Shake", category: "Milkshakes", price: "5.60", rating: 4.6, imageUrl: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=900&q=80" },
    { name: "Oreo Crunch Shake", category: "Milkshakes", price: "6.10", rating: 4.7, imageUrl: "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=900&q=80" },
    { name: "Caramel Hazelnut Shake", category: "Milkshakes", price: "6.30", rating: 4.6, imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80" },
    { name: "Pistachio Shake", category: "Milkshakes", price: "6.40", rating: 4.4, imageUrl: "https://images.unsplash.com/photo-1568901839119-631418a3910d?auto=format&fit=crop&w=900&q=80" },
    { name: "Banana Toffee Shake", category: "Milkshakes", price: "5.70", rating: 4.5, imageUrl: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=900&q=80" },
    { name: "Tagliatelle Bolognese", category: "Italian", price: "13.90", rating: 4.8, imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80" },
    { name: "Creamy Pesto Gnocchi", category: "Italian", price: "12.70", rating: 4.7, imageUrl: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=900&q=80" },
    { name: "Croque Monsieur", category: "French", price: "9.60", rating: 4.5, imageUrl: "https://images.unsplash.com/photo-1481070555726-e2fe8357725c?auto=format&fit=crop&w=900&q=80" },
    { name: "Ratatouille Bowl", category: "French", price: "11.40", rating: 4.6, imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80" },
    { name: "Fresh Orange Spritz", category: "Beverages", price: "4.70", rating: 4.5, imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=80" },
    { name: "Iced Latte", category: "Beverages", price: "4.90", rating: 4.6, imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80" },
    { name: "Gelato Trio Cup", category: "Ice Cream", price: "6.80", rating: 4.8, imageUrl: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?auto=format&fit=crop&w=900&q=80" },
    { name: "Swiss Chocolate Box", category: "Chocolates", price: "8.50", rating: 4.7, imageUrl: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=900&q=80" },
    { name: "Artisan Sourdough", category: "Breads", price: "4.80", rating: 4.6, imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80" },
    { name: "Butter Croissant Pack", category: "Breads", price: "5.40", rating: 4.8, imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80" },
    { name: "Greek Feta Salad", category: "Salads", price: "8.70", rating: 4.5, imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80" },
  ];

  await db.insert(menuItemsTable).values(
    items.map(item => ({ ...item, restaurantId: restaurant.id }))
  );

  console.log(`Seeded ${items.length} menu items. Done!`);
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });