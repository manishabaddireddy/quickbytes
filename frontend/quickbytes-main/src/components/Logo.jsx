export default function Logo({ onHome }) {
  return (
    <button
      className="brand"
      onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); onHome?.(); }}
      aria-label="QuickBytes home"
    >
      <span className="logo-badge"><span>Q</span><span>B</span></span>
      <strong>QuickBytes</strong>
    </button>
  );
}