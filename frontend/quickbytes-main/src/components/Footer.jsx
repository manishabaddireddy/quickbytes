import { Apple, Camera, Coffee, Mail, MessageCircle, Phone, ThumbsUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div id="info">
        <h3>Information</h3>
        <p>QuickBytes serves delivery and dining menus inspired by European favorites, fast-food classics, desserts, and bakery picks.</p>
      </div>
      <div id="contact">
        <h3>Contact</h3>
        <p><Mail size={16} /> hello@quickbytes.app</p>
        <p><Phone size={16} /> +353 1 555 0199</p>
      </div>
      <div>
        <h3>Download</h3>
        <button><Apple size={16} /> App Store</button>
        <button><Coffee size={16} /> Google Play</button>
      </div>
      <div>
        <h3>Follow us</h3>
        <p><Camera size={16} /> Instagram</p>
        <p><ThumbsUp size={16} /> Facebook</p>
        <p><MessageCircle size={16} /> Twitter</p>
      </div>
    </footer>
  );
}