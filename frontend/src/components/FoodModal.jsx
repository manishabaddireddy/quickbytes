import { X, Star, ShoppingCart } from 'lucide-react';

export default function FoodModal({ item, onClose, addToCart }) {
  if (!item) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff', borderRadius: 16, maxWidth: 480, width: '100%',
          overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            style={{ width: '100%', height: 220, objectFit: 'cover' }}
          />
        )}
        <div style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h2 style={{ margin: 0, fontSize: '1.4rem' }}>{item.name}</h2>
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
            >
              <X size={22} />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '8px 0 12px' }}>
            <Star size={15} fill="#ffbc0d" color="#ffbc0d" />
            <span style={{ fontWeight: 600 }}>{item.rating ?? '4.5'}</span>
            <span style={{ color: '#999', fontSize: '0.85rem' }}>· {item.category}</span>
          </div>

          <p style={{ color: '#555', lineHeight: 1.6, marginBottom: 20 }}>
            {item.description || `Delicious ${item.name} prepared fresh with quality ingredients.`}
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#db0007' }}>
              €{Number(item.price).toFixed(2)}
            </span>
            <button
              onClick={() => { addToCart(item); onClose(); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#db0007', color: '#fff', border: 'none',
                borderRadius: 10, padding: '12px 24px', fontWeight: 700,
                fontSize: '1rem', cursor: 'pointer',
              }}
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}