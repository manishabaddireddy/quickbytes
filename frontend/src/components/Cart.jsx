import { Minus, Plus, X } from 'lucide-react';
import { euro } from '../data/menuItems.js';

export default function Cart({ cart, total, removeFromCart, decreaseFromCart, addToCart, onCheckout }) {
  return (
    <section className="cart-card">
      <h2>Cart</h2>
      <div className="cart-list">
        {cart.length === 0
          ? <p>Your delivery cart is empty.</p>
          : cart.map((item) => (
            <div className="cart-row" key={item.id}>
              <span style={{ flex: 1 }}>{item.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <button
                  onClick={() => decreaseFromCart(item.id)}
                  aria-label="Decrease"
                >
                  <Minus size={12} />
                </button>
                <strong>{item.qty}</strong>
                <button
                  onClick={() => addToCart(item)}
                  aria-label="Increase"
                >
                  <Plus size={12} />
                </button>
              </div>
              <strong>{euro.format(item.price * item.qty)}</strong>
              <button
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.name}`}
              >
                <X size={14} />
              </button>
            </div>
          ))}
      </div>
      <div className="cart-total">
        <span>Total</span>
        <strong>{euro.format(total)}</strong>
      </div>
      <button
        className="checkout-btn"
        disabled={!cart.length}
        onClick={onCheckout}
      >
        Checkout
      </button>
    </section>
  );
}