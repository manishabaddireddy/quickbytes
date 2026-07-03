import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, restaurantsTable, insertRestaurantSchema } from "../db/index.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

// GET /api/restaurants — public
router.get("/restaurants", async (req, res) => {
  let rows = await db.select().from(restaurantsTable).orderBy(restaurantsTable.id);
  if (req.query.cuisine) {
    const c = (req.query.cuisine as string).toLowerCase();
    rows = rows.filter((r) => r.cuisine.toLowerCase().includes(c));
  }
  if (req.query.isOpen !== undefined) {
    const open = req.query.isOpen === "true";
    rows = rows.filter((r) => r.isOpen === open);
  }
  res.json(rows);
});

// POST /api/restaurants — protected
router.post("/restaurants", authenticate, async (req, res) => {
  const parsed = insertRestaurantSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [restaurant] = await db.insert(restaurantsTable).values(parsed.data).returning();
  res.status(201).json(restaurant);
});

// GET /api/restaurants/:id — public
router.get("/restaurants/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const [restaurant] = await db.select().from(restaurantsTable).where(eq(restaurantsTable.id, id));
  if (!restaurant) { res.status(404).json({ error: "Restaurant not found" }); return; }
  res.json(restaurant);
});

// PUT /api/restaurants/:id — protected
router.put("/restaurants/:id", authenticate, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const parsed = insertRestaurantSchema.partial().safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [restaurant] = await db.update(restaurantsTable).set(parsed.data).where(eq(restaurantsTable.id, id)).returning();
  if (!restaurant) { res.status(404).json({ error: "Restaurant not found" }); return; }
  res.json(restaurant);
});

// DELETE /api/restaurants/:id — protected
router.delete("/restaurants/:id", authenticate, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const [r] = await db.delete(restaurantsTable).where(eq(restaurantsTable.id, id)).returning();
  if (!r) { res.status(404).json({ error: "Restaurant not found" }); return; }
  res.sendStatus(204);
});

export default router;