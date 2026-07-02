import { useEffect, useState } from 'react';
import { Bike, CheckCircle, ChefHat, Home } from 'lucide-react';
import { api } from '../api.js';

const STATUS_STEPS = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];
const STEP_LABELS = {
  pending: { label: 'Order Confirmed', desc: 'Restaurant received your order', icon: CheckCircle },
  confirmed: { label: 'Confirmed', desc: 'Restaurant accepted your order', icon: CheckCircle },
  preparing: { label: 'Preparing', desc: 'Chef is cooking your food', icon: ChefHat },
  out_for_delivery: { label: 'On the Way', desc: 'Driver is heading to you', icon: Bike },
  delivered: { label: 'Delivered', desc: 'Enjoy your meal!', icon: Home },
};

export default function OrderTrackingPage({ orderId, address, onDone }) {
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    const poll = async () => {
      try {
        const data = await api.getOrder(orderId);
        setStatus(data.order.status);
      } catch (e) {
        console.error(e);
      }
    };
    poll();
    const interval = setInterval(poll, 5000); // poll every 5 seconds
    return () => clearInterval(interval);
  }, [orderId]);

  const currentStepIndex = STATUS_STEPS.indexOf(status);

  return (
    <div style={{ maxWidth: 480, margin: '40px auto', padding: '0 24px' }}>
      <h2 style={{ marginBottom: 8 }}>Tracking Order #{orderId}</h2>
      <p style={{ color: '#666', marginBottom: 32 }}>📍 {address.street}, {address.city}</p>

      {STATUS_STEPS.map((s, i) => {
        const { label, desc, icon: Icon } = STEP_LABELS[s];
        const done = i <= currentStepIndex;
        const active = i === currentStepIndex;
        return (
          <div key={s} style={{ display: 'flex', gap: 16, marginBottom: 28, opacity: done ? 1 : 0.35 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: done ? '#db0007' : '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: done ? '#fff' : '#999', flexShrink: 0 }}>
                <Icon size={20} />
              </div>
              {i < STATUS_STEPS.length - 1 && <div style={{ width: 2, flex: 1, background: i < currentStepIndex ? '#db0007' : '#eee', minHeight: 20, marginTop: 4 }} />}
            </div>
            <div style={{ paddingTop: 10 }}>
              <strong style={{ color: active ? '#db0007' : 'inherit' }}>{label}{active ? ' ⏳' : done ? ' ✓' : ''}</strong>
              <p style={{ margin: '2px 0 0', color: '#666', fontSize: '0.85rem' }}>{desc}</p>
            </div>
          </div>
        );
      })}

      {status === 'delivered' && (
        <button className="checkout-btn" style={{ width: '100%', marginTop: 16 }} onClick={onDone}>
          Back to Menu
        </button>
      )}
    </div>
  );
}