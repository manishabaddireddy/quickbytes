import { CheckCircle } from 'lucide-react';
import { euro } from '../data/menuItems.js';

export default function OrderConfirmationPage({ orderId, total, address, onTrackOrder }) {
  return (
    <div style={{ maxWidth: 480, margin: '60px auto', padding: '0 24px', textAlign: 'center' }}>
      <CheckCircle size={72} color="#22c55e" />
      <h1 style={{ margin: '20px 0 8px' }}>Order Placed!</h1>
      <p style={{ color: '#666', marginBottom: 24 }}>Your order #{orderId} has been confirmed and is being prepared.</p>
      <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', marginBottom: 24, textAlign: 'left' }}>
        <p><strong>Order ID:</strong> #{orderId}</p>
        <p><strong>Total paid:</strong> {euro.format(total)}</p>
        <p><strong>Delivering to:</strong> {address.street}, {address.city}</p>
        <p><strong>Estimated time:</strong> 25–35 minutes</p>
      </div>
      <button className="checkout-btn" style={{ width: '100%' }} onClick={onTrackOrder}>Track My Order →</button>
    </div>
  );
}