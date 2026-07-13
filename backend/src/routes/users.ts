import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, usersTable, insertUserSchema } from "../db/index.js";
import { authenticate } from "../middleware/authMiddleware.js";
import bcrypt from "bcryptjs";

const router = Router();

// GET /api/users — admin only, never returns passwords
router.get("/users", authenticate, async (_req, res) => {
  const users = await db.select({
    id: usersTable.id,
    name: usersTable.name,
    email: usersTable.email,
    phone: usersTable.phone,
    address: usersTable.address,
    isAdmin: usersTable.isAdmin,
    createdAt: usersTable.createdAt,
  }).from(usersTable).orderBy(usersTable.id);
  res.json(users);
});

// POST /api/users — hashes password before storing
router.post("/users", async (req, res) => {
  const parsed = insertUserSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const hashedPassword = await bcrypt.hash(parsed.data.password, 10);
  const [user] = await db.insert(usersTable)
    .values({ ...parsed.data, password: hashedPassword })
    .returning();
  const { password: _pw, ...safeUser } = user;
  res.status(201).json(safeUser);
});

// GET /api/users/:id — protected, never returns password
router.get("/users/:id", authenticate, async (req, res) => {
  const id = parseInt(req.params.id as string, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const [user] = await db.select({
    id: usersTable.id,
    name: usersTable.name,
    email: usersTable.email,
    phone: usersTable.phone,
    address: usersTable.address,
    isAdmin: usersTable.isAdmin,
    createdAt: usersTable.createdAt,
  }).from(usersTable).where(eq(usersTable.id, id));
  if (!user) { res.status(404).json({ error: "User not found" }); return; }
  res.json(user);
});

// PUT /api/users/:id — protected
router.put("/users/:id", authenticate, async (req, res) => {
  const id = parseInt(req.params.id as string, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const parsed = insertUserSchema.partial().safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

  // Hash password if it's being updated
  if (parsed.data.password) {
    parsed.data.password = await bcrypt.hash(parsed.data.password, 10);
  }

  const [user] = await db.update(usersTable).set(parsed.data).where(eq(usersTable.id, id)).returning();
  if (!user) { res.status(404).json({ error: "User not found" }); return; }
  const { password: _pw, ...safeUser } = user;
  res.json(safeUser);
});

// DELETE /api/users/:id — protected
router.delete("/users/:id", authenticate, async (req, res) => {
  const id = parseInt(req.params.id as string, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const [user] = await db.delete(usersTable).where(eq(usersTable.id, id)).returning();
  if (!user) { res.status(404).json({ error: "User not found" }); return; }
  res.sendStatus(204);
});

export default router;