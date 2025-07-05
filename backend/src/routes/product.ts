// d:\Programing\5-29-2025\Mern-main\backend\src\routes\product.ts
import express from "express";
import {
  getProducts,
  postProduct,
  updateProduct,
  deleteProduct,
  getProductCategories,
} from "../controllers/product";
import { searchProducts, getProductSuggestions } from "../controllers/search";

const router = express.Router();

router.get("/products/search", searchProducts);
router.get("/products/suggestions", getProductSuggestions);
router.get("/products/categories", getProductCategories);

router.get("/products", getProducts);
router.post("/products", postProduct);
router.put("/products/:_id", updateProduct);
router.delete("/products/:id", deleteProduct);

export { router as productRoutes };
