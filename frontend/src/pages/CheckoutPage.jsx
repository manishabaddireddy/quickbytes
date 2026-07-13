import { useState } from 'react';
import { ArrowLeft, Smartphone } from 'lucide-react';

const euro = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' });

export default function CheckoutPage({ cart, total, address, onBack, onPlaceOrder }) {
  const [upi, setUpi] = useState('');
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);

  const handlePay = async () => {
    if (!upi.trim()) { alert('Please enter a UPI ID'); return; }
    setPaying(true);
    await new Promise((r) => setTimeout(r, 2500));
    setPaid(true);
    setPaying(false);
    await new Promise((r) => setTimeout(r, 1000));
    onPlaceOrder();
  };

  return (
    <div style={{ maxWidth: 520, margin: '40px auto', padding: '0 24px' }}>
      <button
        onClick={onBack}
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', marginBottom: 24, color: '#555', fontWeight: 600 }}
      >
        <ArrowLeft size={18} /> Back to Menu
      </button>

      <h2 style={{ marginBottom: 4 }}>Checkout</h2>
      <p style={{ color: '#666', marginBottom: 28 }}>
        Delivering to: <strong>{address?.street}, {address?.city}</strong>
      </p>

      <div style={{ border: '1px solid #e0e0e0', borderRadius: 12, padding: 20, marginBottom: 24, background: '#fafafa' }}>
        <h3 style={{ margin: '0 0 14px' }}>Order Summary</h3>
        {cart.map((item) => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.95rem' }}>
            <span>{item.name} × {item.qty}</span>
            <strong>{euro.format(item.price * item.qty)}</strong>
          </div>
        ))}
        <div style={{ borderTop: '1px solid #ddd', marginTop: 12, paddingTop: 12, display: 'flex', justifyContent: 'space-between' }}>
          <strong>Total</strong>
          <strong style={{ color: '#db0007', fontSize: '1.1rem' }}>{euro.format(total)}</strong>
        </div>
      </div>

      <div style={{ border: '1px solid #e0e0e0', borderRadius: 12, padding: 24, background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <Smartphone size={24} color="#5f259f" />
          <div>
            <p style={{ margin: 0, fontWeight: 700, color: '#5f259f' }}>Pay via UPI</p>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#888' }}>PhonePe · GPay · Paytm</p>
          </div>
        </div>

        <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: '0.9rem' }}>
          Enter UPI ID
        </label>
        <input
          type="text"
          placeholder="yourname@ybl"
          value={upi}
          onChange={(e) => setUpi(e.target.value)}
          disabled={paying || paid}
          style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #ddd', fontSize: '1rem', marginBottom: 16, boxSizing: 'border-box' }}
        />

        {paid ? (
          <div style={{ textAlign: 'center', padding: '16px 0', color: '#2e7d32', fontWeight: 700, fontSize: '1.1rem' }}>
            ✅ Payment Successful! Placing your order...
          </div>
        ) : (
          <button
            onClick={handlePay}
            disabled={paying || !upi.trim()}
            style={{
              width: '100%', padding: '14px', borderRadius: 10, border: 'none',
              background: paying ? '#999' : '#5f259f', color: '#fff',
              fontWeight: 700, fontSize: '1rem', cursor: paying ? 'not-allowed' : 'pointer',
            }}
          >
            {paying ? '⏳ Processing payment...' : `Pay ${euro.format(total)}`}
          </button>
        )}
      </div>
    </div>
  );
}