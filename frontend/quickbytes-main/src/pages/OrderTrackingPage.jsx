import { useEffect, useState } from 'react';
import { api } from '../api.js';

const STEPS = [
  { key: 'pending',          label: 'Order Received',     icon: '📋', desc: 'We got your order!' },
  { key: 'confirmed',        label: 'Confirmed',          icon: '✅', desc: 'Restaurant confirmed your order' },
  { key: 'preparing',        label: 'Being Prepared',     icon: '👨‍🍳', desc: 'Chef is cooking your food' },
  { key: 'out_for_delivery', label: 'Out for Delivery',   icon: '🛵', desc: 'Driver is on the way' },
  { key: 'delivered',        label: 'Delivered',          icon: '🎉', desc: 'Enjoy your meal!' },
];

const euro = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' });

export default function OrderTrackingPage({ orderId, address, onDone }) {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  const fetchOrder = async () => {
    try {
      const data = await api.getOrder(orderId);
      setOrder(data.order);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (!orderId) return;
    fetchOrder();
    const interval = setInterval(fetchOrder, 5000);
    return () => clearInterval(interval);
  }, [orderId]);

  const currentIndex = STEPS.findIndex((s) => s.key === order?.status);
  const isCancelled = order?.status === 'cancelled';
  const isDelivered = order?.status === 'delivered';

  return (
    <div style={{ maxWidth: 520, margin: '40px auto', padding: '0 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h2 style={{ margin: 0 }}>Tracking Order #{orderId}</h2>
          <p style={{ color: '#888', margin: '4px 0 0', fontSize: '0.85rem' }}>
            Updates every 5 seconds · {address?.street}, {address?.city}
          </p>
        </div>
        {order && (
          <span style={{ fontWeight: 700, color: '#db0007' }}>
            {euro.format(parseFloat(order.totalAmount))}
          </span>
        )}
      </div>

      {error && (
        <p style={{ color: '#db0007', background: '#fff0f0', padding: 14, borderRadius: 8 }}>{error}</p>
      )}

      {!order && !error && (
        <p style={{ color: '#999', textAlign: 'center', padding: '40px 0' }}>Loading order status...</p>
      )}

      {isCancelled && (
        <div style={{ textAlign: 'center', padding: '40px 20px', background: '#fff0f0', borderRadius: 12 }}>
          <p style={{ fontSize: '3rem' }}>❌</p>
          <h3 style={{ color: '#db0007' }}>Order Cancelled</h3>
          <p style={{ color: '#888' }}>Your order has been cancelled.</p>
          <button onClick={onDone} style={{ marginTop: 16, background: '#db0007', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>
            Back to Home
          </button>
        </div>
      )}

      {order && !isCancelled && (
        <>
          <div style={{ position: 'relative', paddingLeft: 40 }}>
            {STEPS.map((step, index) => {
              const done = index <= currentIndex;
              const active = index === currentIndex;
              return (
                <div key={step.key} style={{ display: 'flex', gap: 16, marginBottom: 28, position: 'relative' }}>
                  <div style={{ position: 'absolute', left: -40, top: 0, width: 36, height: 36, borderRadius: '50%', background: done ? '#db0007' : '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', border: active ? '3px solid #db0007' : '3px solid transparent', transition: '0.4s', flexShrink: 0 }}>
                    {done ? step.icon : <span style={{ color: '#ccc', fontSize: '1rem' }}>○</span>}
                  </div>
                  {index < STEPS.length - 1 && (
                    <div style={{ position: 'absolute', left: -23, top: 36, width: 2, height: 28, background: index < currentIndex ? '#db0007' : '#e0e0e0', transition: '0.4s' }} />
                  )}
                  <div style={{ paddingTop: 6 }}>
                    <p style={{ margin: 0, fontWeight: active ? 700 : done ? 600 : 400, color: done ? '#222' : '#aaa', fontSize: active ? '1.05rem' : '0.95rem' }}>
                      {step.label}
                    </p>
                    {active && (
                      <p style={{ margin: '2px 0 0', color: '#666', fontSize: '0.85rem' }}>{step.desc}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {isDelivered && (
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <p style={{ color: '#4caf50', fontWeight: 700, fontSize: '1.1rem', marginBottom: 16 }}>
                🎉 Your order has been delivered! Enjoy your meal!
              </p>
              <button onClick={onDone} style={{ background: '#db0007', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
                Order Again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}