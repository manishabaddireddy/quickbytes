import { useEffect, useMemo, useState } from 'react';
import AuthModal from './components/AuthModal.jsx';
import FoodModal from './components/FoodModal.jsx';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import { api } from './api.js';
import AdminPage from './pages/AdminPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import OrderConfirmationPage from './pages/OrderConfirmationPage.jsx';
import OrderTrackingPage from './pages/OrderTrackingPage.jsx';
import WelcomePage from './pages/WelcomePage.jsx';

const RESTAURANT_ID = 1;

export default function App() {
  const [mode, setMode] = useState('welcome');
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [takenSeats, setTakenSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [authView, setAuthView] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [menuLoading, setMenuLoading] = useState(true);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState({ street: '', city: '', postcode: '' });
  const [selectedItem, setSelectedItem] = useState(null);

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('qb_user');
    return stored ? JSON.parse(stored) : null;
  });

  // Load menu items from backend
  useEffect(() => {
    api.getMenuItems()
      .then((items) =>
        setMenuItems(
          items.map((item) => ({
            ...item,
            price: parseFloat(item.price),
            image: item.imageUrl,
          }))
        )
      )
      .catch(console.error)
      .finally(() => setMenuLoading(false));
  }, []);

  // Load taken seats from backend
  useEffect(() => {
    api.getSeats()
      .then((seats) => setTakenSeats(seats.map((s) => s.seat)))
      .catch(console.error);
  }, []);

  const categories = useMemo(
    () => ['All', ...new Set(menuItems.map((i) => i.category))],
    [menuItems]
  );

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const categoryMatch = activeCategory === 'All' || item.category === activeCategory;
      const searchMatch = `${item.name} ${item.category}`
        .toLowerCase()
        .includes(query.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [menuItems, activeCategory, query]);

  const total = cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);

  // Add item or increase qty
  const addToCart = (item) =>
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing)
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: (i.qty || 1) + 1 } : i
        );
      return [...prev, { ...item, qty: 1 }];
    });

  // Decrease qty by 1, remove if qty reaches 0
  const decreaseFromCart = (id) =>
    setCart((prev) =>
      prev
        .map((item) => item.id === id ? { ...item, qty: item.qty - 1 } : item)
        .filter((item) => item.qty > 0)
    );

  // Remove item entirely
  const removeFromCart = (id) =>
    setCart((items) => items.filter((item) => item.id !== id));

  // Toggle seat selection
  const toggleSeat = (seat) => {
    setSelectedSeats((seats) =>
      seats.includes(seat) ? seats.filter((s) => s !== seat) : [...seats, seat]
    );
  };

  // Confirm seat booking via API
  const handleConfirmSeats = async () => {
    try {
      for (const seat of selectedSeats) {
        await api.bookSeat(seat);
      }
      setTakenSeats((prev) => [...prev, ...selectedSeats]);
      setSelectedSeats([]);
      alert(`Seats ${selectedSeats.sort((a, b) => a - b).join(', ')} booked successfully!`);
    } catch (err) {
      alert('Booking failed: ' + err.message);
    }
  };

  // Called after payment simulation in CheckoutPage
  const handlePlaceOrder = async () => {
    if (!user) {
      setAuthView('login');
      return;
    }
    try {
      const orderItems = cart.map((item) => ({
        menuItemId: item.id,
        quantity: item.qty || 1,
      }));
      const addressStr = `${deliveryAddress.street}, ${deliveryAddress.city}, ${deliveryAddress.postcode}`;
      const data = await api.placeOrder(RESTAURANT_ID, addressStr, orderItems);
      setCurrentOrder({ id: data.order.id, total, address: deliveryAddress });
      setCart([]);
      setMode('confirmation');
    } catch (err) {
      alert('Order failed: ' + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('qb_token');
    localStorage.removeItem('qb_user');
    setUser(null);
    setMode('welcome');
  };

  const renderMain = () => {
    if (mode === 'welcome') {
      return <WelcomePage setMode={setMode} />;
    }
    if (mode === 'admin') {
      return <AdminPage />;
    }
    if (mode === 'checkout') {
      return (
        <CheckoutPage
          cart={cart}
          total={total}
          address={deliveryAddress}
          onBack={() => setMode('delivery')}
          onPlaceOrder={handlePlaceOrder}
        />
      );
    }
    if (mode === 'confirmation') {
      return (
        <OrderConfirmationPage
          orderId={currentOrder?.id}
          total={currentOrder?.total}
          address={currentOrder?.address}
          onTrackOrder={() => setMode('tracking')}
        />
      );
    }
    if (mode === 'tracking') {
      return (
        <OrderTrackingPage
          orderId={currentOrder?.id}
          address={currentOrder?.address}
          onDone={() => setMode('welcome')}
        />
      );
    }
    // delivery or dine-in
    return (
      <MenuPage
        mode={mode}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categories={categories}
        filteredItems={filteredItems}
        menuLoading={menuLoading}
        addToCart={addToCart}
        cart={cart}
        total={total}
        removeFromCart={removeFromCart}
        decreaseFromCart={decreaseFromCart}
        takenSeats={takenSeats}
        selectedSeats={selectedSeats}
        toggleSeat={toggleSeat}
        onConfirmSeats={handleConfirmSeats}
        onItemClick={(item) => setSelectedItem(item)}
        onCheckout={() => {
          if (!user) { setAuthView('login'); return; }
          if (!deliveryAddress.street) {
            const street = prompt('Enter street address:');
            const city = prompt('Enter city:');
            const postcode = prompt('Enter postcode:');
            if (street && city && postcode) {
              setDeliveryAddress({ street, city, postcode });
            } else return;
          }
          setMode('checkout');
        }}
        deliveryAddress={deliveryAddress}
        setDeliveryAddress={setDeliveryAddress}
      />
    );
  };

  return (
    <div className="app-shell">
      <Sidebar setMode={setMode} mode={mode} />

      <main className="main-panel">
        <Navbar
          query={query}
          setQuery={setQuery}
          setAuthView={setAuthView}
          onHome={() => setMode('welcome')}
          user={user}
          onLogout={handleLogout}
          onAdmin={() => setMode('admin')}
        />

        {renderMain()}

        <Footer />
      </main>

      {selectedItem && (
        <FoodModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          addToCart={addToCart}
        />
      )}

      {authView && (
        <AuthModal
          type={authView}
          onClose={() => setAuthView(null)}
          onAuthSuccess={(u) => {
            setUser(u);
            setAuthView(null);
          }}
        />
      )}
    </div>
  );
}