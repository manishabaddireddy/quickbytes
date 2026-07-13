import { useState } from 'react';
import { MapPin, X } from 'lucide-react';

export default function AddressModal({ onClose, onConfirm }) {
  const [address, setAddress] = useState({ street: '', city: '', postcode: '' });
  const isValid = address.street && address.city && address.postcode;

  return (
    <div className="modal-backdrop">
      <form className="auth-modal" onSubmit={(e) => { e.preventDefault(); if (isValid) onConfirm(address); }}>
        <button type="button" className="close-btn" onClick={onClose}><X size={18} /></button>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><MapPin size={20} /> Delivery Address</h2>
        <input placeholder="Street address" value={address.street} onChange={(e) => setAddress((a) => ({ ...a, street: e.target.value }))} required />
        <input placeholder="City" value={address.city} onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))} required />
        <input placeholder="Postcode" value={address.postcode} onChange={(e) => setAddress((a) => ({ ...a, postcode: e.target.value }))} required />
        <button type="submit" className="checkout-btn" disabled={!isValid}>Confirm Address</button>
      </form>
    </div>
  );
}