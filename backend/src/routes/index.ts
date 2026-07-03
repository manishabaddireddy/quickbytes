import { Router } from "express";
import usersRouter from "./users";
import restaurantsRouter from "./restaurants";
import menuItemsRouter from "./menuItems";
import ordersRouter from "./orders";
import authRouter from "./auth";
import seatBookingsRouter from "./seatBookings";

const router = Router();
router.use(authRouter);
router.use(usersRouter);
router.use(restaurantsRouter);
router.use(menuItemsRouter);
router.use(ordersRouter);
router.use(seatBookingsRouter);

export default router;