// d:\Programing\5-29-2025\Mern-main\backend\src\routes\auth.ts
import express from "express";
import { verifySellerPassword, verifySellerToken } from "../controllers/auth";

const router = express.Router();

router.post("/auth/seller", verifySellerPassword);
router.get("/auth/verify", verifySellerToken);

export { router as authRoutes };
