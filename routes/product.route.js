import express from "express";
import { addProducts, getProductById, getProducts } from "../controllers/product.controller.js";

const router = express.Router();


router.route("/add").post(addProducts);
router.route("/").get(getProducts);
router.route("/:id").get(getProductById)

export default router;
