import { CheckCircle } from 'lucide-react';

const euro = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' });

export default function OrderConfirmationPage({ orderId, total, address, onTrackOrder }) {
  return (
    <div style={{ maxWidth: 480, margin: '60px auto', padding: '0 24px', textAlign: 'center' }}>
      <CheckCircle size={72} color="#4caf50" style={{ marginBottom: 20 }} />

      <h2 style={{ fontSize: '1.8rem', marginBottom: 8 }}>Order Placed! 🎉</h2>
      <p style={{ color: '#666', marginBottom: 32 }}>
        Your food is being prepared and will be delivered shortly.
      </p>

      <div style={{ border: '1px solid #e0e0e0', borderRadius: 12, padding: 24, marginBottom: 28, background: '#fafafa', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ color: '#888' }}>Order ID</span>
          <strong>#{orderId}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ color: '#888' }}>Amount Paid</span>
          <strong style={{ color: '#db0007' }}>{euro.format(total)}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#888' }}>Delivering to</span>
          <strong style={{ maxWidth: 200, textAlign: 'right' }}>
            {address?.street}, {address?.city}
          </strong>
        </div>
      </div>

      <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: 24 }}>
        Estimated delivery time: <strong>30–45 minutes</strong>
      </p>

      <button
        onClick={onTrackOrder}
        style={{
          background: '#db0007', color: '#fff', border: 'none',
          borderRadius: 12, padding: '14px 36px', fontWeight: 700,
          fontSize: '1rem', cursor: 'pointer', width: '100%',
        }}
      >
        Track My Order →
      </button>
    </div>
  );
}