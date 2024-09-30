import express from "express";
import { userLogin, userRegister } from "../controllers/user.controller.js";
import { addToCart, getAllCartItems, removeFromCart } from "../controllers/cart.controller.js";
import { getAllOrders, placeOrder } from "../controllers/order.controller.js";
import { addToFavorites, getUserFavourites, removeFromFavorites } from "../controllers/wishlist.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/signup").post(userRegister);
router.route("/signin").post(userLogin);

router.route("/cart").get(verifyToken, getAllCartItems);
router.route("/cart").post(verifyToken, addToCart);
router.route("/cart").patch(verifyToken, removeFromCart);

router.route("/order").get(verifyToken, getAllOrders);
router.route("/order").post(verifyToken, placeOrder);

router.route("/favourite").get(verifyToken, getUserFavourites);
router.route("/favourite").post(verifyToken, addToFavorites);
router.route("/favourite").patch(verifyToken, removeFromFavorites);

export default router;
