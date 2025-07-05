import express from "express";
import { verifySellerPassword, verifySellerToken } from "../controllers/auth";

const router = express.Router();

router.post("/auth/seller", verifySellerPassword);
router.get("/auth/verify", verifySellerToken);

export { router as authRoutes };
