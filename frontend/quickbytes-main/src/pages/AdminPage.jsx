import { useState } from 'react';
import { api } from '../api.js';
import { euro } from '../data/menuItems.js';

const STATUSES = [
  { key: 'pending',          label: '⏳ Pending',          color: '#999' },
  { key: 'confirmed',        label: '✅ Confirmed',        color: '#2196f3' },
  { key: 'preparing',        label: '👨‍🍳 Preparing',       color: '#ff9800' },
  { key: 'out_for_delivery', label: '🛵 Out for Delivery', color: '#9c27b0' },
  { key: 'delivered',        label: '🎉 Delivered',        color: '#4caf50' },
  { key: 'cancelled',        label: '❌ Cancelled',        color: '#db0007' },
];

export default function AdminPage() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchOrder = async () => {
    if (!orderId) return;
    setLoading(true);
    setError('');
    setOrder(null);
    setMessage('');
    try {
      const data = await api.getOrder(parseInt(orderId));
      setOrder(data.order);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status) => {
    setUpdating(true);
    setMessage('');
    setError('');
    try {
      const updated = await api.updateOrderStatus(order.id, status);
      setOrder(updated);
      setMessage(`✅ Status updated to "${status}"`);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const currentStatus = STATUSES.find((s) => s.key === order?.status);

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 24px' }}>
      <h2 style={{ marginBottom: 4 }}>🛠 Admin — Order Manager</h2>
      <p style={{ color: '#666', marginBottom: 28, fontSize: '0.9rem' }}>
        Look up an order by ID and update its status. This triggers real-time tracking in the customer view.
      </p>

      <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
        <input
          type="number"
          placeholder="Enter Order ID (e.g. 1)"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchOrder()}
          style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: '1px solid #ddd', fontSize: '1rem' }}
        />
        <button
          onClick={fetchOrder}
          disabled={loading || !orderId}
          style={{ padding: '10px 22px', borderRadius: 8, border: 0, background: '#db0007', color: '#fff', fontWeight: 700, cursor: 'pointer', opacity: loading ? 0.6 : 1 }}
        >
          {loading ? 'Loading...' : 'Look Up'}
        </button>
      </div>

      {error && (
        <p style={{ color: '#db0007', background: '#fff0f0', padding: '10px 14px', borderRadius: 8, marginBottom: 20 }}>
          {error}
        </p>
      )}

      {message && (
        <p style={{ color: '#2e7d32', background: '#f0fff4', padding: '10px 14px', borderRadius: 8, marginBottom: 20 }}>
          {message}
        </p>
      )}

      {order && (
        <div style={{ border: '1px solid #e0e0e0', borderRadius: 12, padding: 24, background: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <h3 style={{ margin: 0 }}>Order #{order.id}</h3>
              <p style={{ margin: '4px 0 0', color: '#666', fontSize: '0.85rem' }}>{order.deliveryAddress}</p>
            </div>
            <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 700, background: currentStatus?.color + '22', color: currentStatus?.color }}>
              {currentStatus?.label || order.status}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, fontSize: '0.9rem', color: '#444' }}>
            <span>Total: <strong>{euro.format(parseFloat(order.totalAmount))}</strong></span>
            <span>User ID: <strong>{order.userId}</strong></span>
          </div>

          <p style={{ margin: '0 0 12px', fontWeight: 700, fontSize: '0.85rem', color: '#333' }}>UPDATE STATUS:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {STATUSES.map((s) => (
              <button
                key={s.key}
                onClick={() => updateStatus(s.key)}
                disabled={updating || order.status === s.key}
                style={{
                  padding: '8px 16px', borderRadius: 8, border: 'none',
                  background: order.status === s.key ? s.color : '#f5f5f5',
                  color: order.status === s.key ? '#fff' : '#333',
                  fontWeight: order.status === s.key ? 700 : 500,
                  cursor: order.status === s.key ? 'default' : 'pointer',
                  opacity: updating ? 0.6 : 1, fontSize: '0.85rem', transition: '0.2s',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: 40, padding: '16px 20px', background: '#fff8ea', borderRadius: 10, border: '1px solid #ffd88a', fontSize: '0.85rem', color: '#7a5c00' }}>
        <strong>💡 How to test real-time tracking:</strong>
        <ol style={{ margin: '8px 0 0', paddingLeft: 18 }}>
          <li>Place an order as a customer and go to Order Tracking</li>
          <li>Note the Order ID shown on the tracking page</li>
          <li>Open Admin panel, look up that Order ID</li>
          <li>Click status buttons — tracking page updates every 5 seconds</li>
        </ol>
      </div>
    </div>
  );
}