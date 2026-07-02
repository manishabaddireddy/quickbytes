import { ShoppingCart, Star, X } from 'lucide-react';
import { euro } from '../data/menuItems.js';

const descriptions = {
  Burgers: 'Freshly grilled with premium ingredients, served on a toasted brioche bun with house sauce, lettuce, tomato, and pickles.',
  Pizzas: 'Stone-baked in our wood-fired oven with San Marzano tomato base and premium toppings.',
  Milkshakes: 'Hand-spun with real ice cream and fresh ingredients for a rich, creamy finish.',
  Italian: 'Authentic Italian recipe made fresh daily with imported ingredients from Italy.',
  French: 'Classic French preparation with a modern twist, using seasonal European produce.',
  Beverages: 'Made fresh to order using natural ingredients and no artificial additives.',
  'Ice Cream': 'Artisan gelato made daily with natural flavours and no preservatives.',
  Chocolates: 'Premium European chocolate crafted by master chocolatiers.',
  Breads: 'Freshly baked every morning using traditional techniques and quality flour.',
  Salads: 'Crisp, fresh ingredients sourced daily from local European farms.',
};

export default function FoodModal({ item, onClose, addToCart }) {
  if (!item) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="food-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}><X size={18} /></button>
        <img src={item.image} alt={item.name} style={{ width: '100%', height: 240, objectFit: 'cover', borderRadius: '12px 12px 0 0' }} />
        <div style={{ padding: 24 }}>
          <span className="pill">{item.category}</span>
          <h2 style={{ margin: '10px 0 8px' }}>{item.name}</h2>
          <p style={{ color: '#666', marginBottom: 16 }}>{descriptions[item.category] || 'A delicious QuickBytes favourite.'}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <Star size={16} fill="#ffbc0d" color="#ffbc0d" />
            <span style={{ fontWeight: 700 }}>{item.rating}</span>
            <span style={{ color: '#999' }}>(120+ reviews)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong style={{ fontSize: '1.5rem' }}>{euro.format(item.price)}</strong>
            <button className="checkout-btn" style={{ width: 'auto' }} onClick={() => { addToCart(item); onClose(); }}>
              <ShoppingCart size={18} /> Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}