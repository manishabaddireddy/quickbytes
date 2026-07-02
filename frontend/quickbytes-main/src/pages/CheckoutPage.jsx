import { useState } from 'react';
import { CheckCircle, Smartphone } from 'lucide-react';
import { euro } from '../data/menuItems.js';

export default function CheckoutPage({ cart, total, address, onPlaceOrder, onBack }) {
  const [upiId, setUpiId] = useState('');
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);
  const isValid = upiId.includes('@') && upiId.length > 3;

  const handlePay = () => {
    if (!isValid) return;
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setPaid(true);
      setTimeout(() => onPlaceOrder(), 1500);
    }, 2500);
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', padding: '0 24px' }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: 20, color: '#5f259f', fontWeight: 700, fontSize: '1rem' }}>← Back to menu</button>

      {/* Order Summary */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 20, marginBottom: 20, boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
        <h3 style={{ margin: '0 0 12px' }}>Order Summary</h3>
        {cart.map((item) => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f0e8d8' }}>
            <span>{item.name} × {item.qty}</span>
            <strong>{euro.format(item.price * item.qty)}</strong>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontWeight: 800, fontSize: '1.1rem' }}>
          <span>Total</span><span>{euro.format(total)}</span>
        </div>
        <p style={{ margin: '12px 0 0', color: '#666', fontSize: '0.85rem' }}>📍 {address.street}, {address.city}, {address.postcode}</p>
      </div>

      {/* PhonePe Payment Box */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>

        {/* PhonePe Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: '#5f259f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Smartphone size={26} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#5f259f' }}>PhonePe</div>
            <div style={{ fontSize: '0.8rem', color: '#888' }}>UPI Payment</div>
          </div>
        </div>

        {paid ? (
          /* Success State */
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle size={56} color="#22c55e" />
            <p style={{ fontWeight: 700, fontSize: '1.1rem', marginTop: 12, color: '#22c55e' }}>Payment Successful!</p>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Placing your order...</p>
          </div>
        ) : paying ? (
          /* Processing State */
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: 56, height: 56, border: '4px solid #f0e8f8', borderTop: '4px solid #5f259f', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
            <p style={{ fontWeight: 700, marginTop: 16, color: '#5f259f' }}>Processing Payment...</p>
            <p style={{ color: '#888', fontSize: '0.85rem' }}>Please wait, do not close this page</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          /* UPI Input State */
          <>
            <p style={{ color: '#555', marginBottom: 16, fontSize: '0.95rem' }}>Enter your PhonePe / UPI ID to pay</p>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#444', display: 'block', marginBottom: 6 }}>UPI ID</label>
              <input
                placeholder="yourname@ybl  or  number@ibl"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', border: '2px solid #e0d0f0', borderRadius: 8, fontSize: '1rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                onFocus={(e) => e.target.style.borderColor = '#5f259f'}
                onBlur={(e) => e.target.style.borderColor = '#e0d0f0'}
              />
              <p style={{ fontSize: '0.78rem', color: '#999', marginTop: 6 }}>e.g. yourname@ybl · yourname@axl · 9876543210@ibl</p>
            </div>

            <button
              onClick={handlePay}
              disabled={!isValid}
              style={{
                width: '100%', padding: '14px', border: 'none', borderRadius: 10,
                background: isValid ? '#5f259f' : '#ccc',
                color: '#fff', fontWeight: 800, fontSize: '1rem', cursor: isValid ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: '0.2s'
              }}
            >
              <Smartphone size={18} /> Pay {euro.format(total)} via PhonePe
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '16px 0' }}>
              <div style={{ flex: 1, height: 1, background: '#eee' }} />
              <span style={{ color: '#aaa', fontSize: '0.8rem' }}>secured by</span>
              <div style={{ flex: 1, height: 1, background: '#eee' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
              {['UPI', 'NPCI', '256-bit SSL'].map((badge) => (
                <span key={badge} style={{ fontSize: '0.75rem', color: '#888', background: '#f5f5f5', padding: '4px 10px', borderRadius: 20 }}>{badge}</span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}