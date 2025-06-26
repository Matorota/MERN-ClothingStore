import express from "express";
import {
  getProducts,
  postProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product";
import { searchProducts, getProductSuggestions } from "../controllers/search";

const router = express.Router();

router.get("/products/search", searchProducts);
router.get("/products/suggestions", getProductSuggestions);

router.get("/products", getProducts);
router.post("/products", postProduct);
router.put("/products/:_id", updateProduct);
router.delete("/products/:id", deleteProduct);

export { router as productRoutes };
