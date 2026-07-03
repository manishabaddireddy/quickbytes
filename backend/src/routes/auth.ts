import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, usersTable, insertUserSchema } from "../db/index.js";
import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "quickbytes_secret";

// POST /api/auth/register
const registerSchema = insertUserSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

router.post("/auth/register", async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const [existing] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, parsed.data.email));
  if (existing) {
    res.status(409).json({ error: "Email already registered" });
    return;
  }
  const hashedPassword = await bcrypt.hash(parsed.data.password, 10);
  const { password, ...rest } = parsed.data;
  const [user] = await db
    .insert(usersTable)
    .values({ ...rest, password: hashedPassword })
    .returning();
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
  res.status(201).json({
    message: "Account created successfully",
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
});

// POST /api/auth/login
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

router.post("/auth/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, parsed.data.email));
  if (!user) {
    res.status(401).json({ error: "No account found with this email." });
    return;
  }
  const passwordMatch = await bcrypt.compare(parsed.data.password, user.password);
  if (!passwordMatch) {
    res.status(401).json({ error: "Incorrect password." });
    return;
  }
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
  res.json({
    message: "Login successful",
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
});

// GET /api/auth/me
router.get("/auth/me", authenticate, async (req, res) => {
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, req.userId));
  if (!user) { res.status(404).json({ error: "User not found" }); return; }
  res.json({ id: user.id, name: user.name, email: user.email, phone: user.phone, address: user.address });
});

export default router;