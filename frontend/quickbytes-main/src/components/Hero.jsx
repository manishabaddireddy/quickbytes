export default function Hero({ mode }) {
  return (
    <section className="banner-track">
      <div className="banner-strip">
        <div className="promo">
          <span>{mode === 'delivery' ? 'Delivery in 25 min' : 'Book seats instantly'}</span>
          <strong>2 meals + 2 drinks from EUR 21.90</strong>
        </div>
        <div className="promo alt">
          <span>Weekend special</span>
          <strong>European menu picks with real chef favorites</strong>
        </div>
      </div>
    </section>
  );
}