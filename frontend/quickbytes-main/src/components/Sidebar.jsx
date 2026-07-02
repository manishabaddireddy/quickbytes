import { Headphones, Info, Menu, Phone } from 'lucide-react';

export default function Sidebar({ setMode }) {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setMode('delivery');
      setTimeout(() => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  const items = [
    { icon: Menu, label: 'Menu', action: () => setMode('delivery') },
    { icon: Info, label: 'Info', action: () => scrollTo('#info') },
    { icon: Phone, label: 'Contact', action: () => scrollTo('#contact') },
    { icon: Headphones, label: 'Care', action: () => alert('Customer Care: support@quickbytes.app') }
  ];

  return (
    <nav className="sidebar" aria-label="QuickBytes sidebar">
      {items.map(({ icon: Icon, label, action }) => (
        <button key={label} onClick={action} title={label} aria-label={label}><Icon size={22} /></button>
      ))}
    </nav>
  );
}