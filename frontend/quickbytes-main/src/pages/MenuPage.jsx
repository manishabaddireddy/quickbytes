import Cart from '../components/Cart.jsx';
import CategoryTabs from '../components/CategoryTabs.jsx';
import FoodGrid from '../components/FoodGrid.jsx';
import Hero from '../components/Hero.jsx';
import SeatBooking from '../components/SeatBooking.jsx';

export default function MenuPage({
  mode,
  activeCategory,
  setActiveCategory,
  categories,
  filteredItems,
  menuLoading,
  addToCart,
  cart,
  total,
  removeFromCart,
  decreaseFromCart,
  takenSeats,
  selectedSeats,
  toggleSeat,
  onConfirmSeats,
  onItemClick,
  onCheckout,
}) {
  return (
    <div className="content-grid">
      <section className="menu-zone">
        <Hero mode={mode} />
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        {menuLoading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#999' }}>
            <p>Loading menu...</p>
          </div>
        ) : (
          <FoodGrid
            items={filteredItems}
            mode={mode}
            addToCart={addToCart}
            onItemClick={onItemClick}
          />
        )}
      </section>

      <aside className="side-zone">
        {mode === 'delivery' ? (
          <Cart
            cart={cart}
            total={total}
            removeFromCart={removeFromCart}
            decreaseFromCart={decreaseFromCart}
            addToCart={addToCart}
            onCheckout={onCheckout}
          />
        ) : (
          <SeatBooking
            takenSeats={takenSeats}
            selectedSeats={selectedSeats}
            toggleSeat={toggleSeat}
            onConfirmSeats={onConfirmSeats}
          />
        )}
      </aside>
    </div>
  );
}