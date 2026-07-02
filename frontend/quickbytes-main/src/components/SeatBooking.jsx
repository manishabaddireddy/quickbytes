import { Armchair } from 'lucide-react';

export default function SeatBooking({ takenSeats, selectedSeats, toggleSeat, onConfirmSeats }) {
  return (
    <section className="seat-card">
      <h2>Reserve Seats</h2>
      <div className="screen-line">QuickBytes Dining</div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 12, fontSize: '0.8rem' }}>
        <span><span style={{ color: '#db0007' }}>■</span> Taken</span>
        <span><span style={{ color: '#ffbc0d' }}>■</span> Selected</span>
        <span><span style={{ color: '#ccc' }}>■</span> Available</span>
      </div>
      <div className="seat-grid">
        {Array.from({ length: 20 }, (_, i) => i + 1).map((seat) => {
          const taken = takenSeats.includes(seat);
          const selected = selectedSeats.includes(seat);
          return (
            <button
              key={seat}
              className={`seat ${taken ? 'taken' : selected ? 'selected' : ''}`}
              onClick={() => !taken && toggleSeat(seat)}
              aria-label={`Seat ${seat}${taken ? ' (unavailable)' : ''}`}
              disabled={taken}
              style={{ opacity: taken ? 0.5 : 1, cursor: taken ? 'not-allowed' : 'pointer' }}
            >
              <Armchair size={18} />
              <span>{seat}</span>
            </button>
          );
        })}
      </div>
      <p>{selectedSeats.length} seat{selectedSeats.length === 1 ? '' : 's'} selected</p>
      <button
        className="checkout-btn"
        disabled={!selectedSeats.length}
        onClick={onConfirmSeats}
      >
        Confirm Booking
      </button>
    </section>
  );
}