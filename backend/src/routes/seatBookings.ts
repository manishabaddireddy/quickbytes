import { Router } from "express";
import { eq } from "drizzle-orm";
import { authenticate } from "../middleware/authMiddleware.js";
import { db } from "../db/index.js";
import { seatBookingsTable } from "../db/schema/seatBookings.js";

const router = Router();

// GET /api/seats — public, returns all booked seats
router.get("/seats", async (_req, res) => {
  const bookings = await db.select().from(seatBookingsTable);
  res.json(bookings);
});

// POST /api/seats/book — protected
router.post("/seats/book", authenticate, async (req, res) => {
  const seat = Number(req.body.seat);
  if (!seat || isNaN(seat)) {
    res.status(400).json({ error: "seat number required" });
    return;
  }
  const [existing] = await db.select().from(seatBookingsTable).where(eq(seatBookingsTable.seat, seat));
  if (existing) {
    res.status(409).json({ error: `Seat ${seat} is already booked` });
    return;
  }
  const [booking] = await db.insert(seatBookingsTable)
    .values({ seat, userId: req.userId })
    .returning();
  res.status(201).json({ message: `Seat ${seat} booked`, booking });
});

// DELETE /api/seats/:seat — protected, only own booking
router.delete("/seats/:seat", authenticate, async (req, res) => {
  const seat = parseInt(req.params.seat as string, 10);
  const [booking] = await db.select().from(seatBookingsTable).where(eq(seatBookingsTable.seat, seat));
  if (!booking) {
    res.status(404).json({ error: "Seat not booked" });
    return;
  }
  if (booking.userId !== req.userId) {
    res.status(403).json({ error: "Cannot cancel someone else's booking" });
    return;
  }
  await db.delete(seatBookingsTable).where(eq(seatBookingsTable.seat, seat));
  res.json({ message: `Seat ${seat} booking cancelled` });
});

export default router;