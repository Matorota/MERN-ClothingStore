import express from "express";
import {
  getProducts,
  postProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product";

const router = express.Router();

router.get("/api/products", getProducts);
router.post("/api/products", postProduct);
router.put("/api/products/:_id", updateProduct);
router.delete("/api/products/:id", deleteProduct);

export { router as productRoutes };
