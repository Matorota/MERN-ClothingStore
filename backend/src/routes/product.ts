import express from "express";
import { getProducts, postProduct } from "../controllers/product"; // Ensure this path is correct

const router = express.Router();

router.get("/products", getProducts);
router.post("/products", postProduct);

export { router as productRoutes };
