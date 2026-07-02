import { Home, Store } from 'lucide-react';

export default function WelcomePage({ setMode }) {
  return (
    <section className="welcome-screen">
      <div className="welcome-copy">
        <span className="eyebrow">Fresh, fast, European favorites</span>
        <h1>How would you like your order?</h1>
        <p>Choose doorstep delivery or reserve your table and browse the full QuickBytes menu.</p>
        <div className="welcome-actions">
          <button className="choice delivery-choice" onClick={() => setMode('delivery')}><Home size={24} /> Delivery</button>
          <button className="choice dining-choice" onClick={() => setMode('dining')}><Store size={24} /> Dining</button>
        </div>
      </div>
      <div className="orbit-stage" aria-hidden="true">
        <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80" alt="" />
        <span className="orbit-chip chip-one">Pizza</span>
        <span className="orbit-chip chip-two">Burger</span>
        <span className="orbit-chip chip-three">Gelato</span>
      </div>
    </section>
  );
}