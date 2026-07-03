import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const seatBookingsTable = pgTable("seat_bookings", {
  id: serial("id").primaryKey(),
  seat: integer("seat").notNull().unique(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  bookedAt: timestamp("booked_at", { withTimezone: true }).notNull().defaultNow(),
});