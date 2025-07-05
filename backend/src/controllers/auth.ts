// d:\Programing\5-29-2025\Mern-main\backend\src\controllers\auth.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Troleibusas123";
const JWT_SECRET =
  process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";

export const verifySellerPassword = async (
  req: Request<{}, {}, { password: string }>,
  res: Response
): Promise<void> => {
  try {
    const { password } = req.body;

    if (!password) {
      res.status(400).json({
        success: false,
        message: "Password is required",
      });
      return;
    }

    if (password !== ADMIN_PASSWORD) {
      res.status(401).json({
        success: false,
        message: "Invalid password",
      });
      return;
    }

    const token = jwt.sign(
      { role: "seller", timestamp: Date.now() },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      success: true,
      message: "Authentication successful",
      token,
      role: "seller",
    });
  } catch (error) {
    console.error("Error verifying seller password:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const verifySellerToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({
        success: false,
        message: "No token provided",
      });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;

    if (decoded.role !== "seller") {
      res.status(403).json({
        success: false,
        message: "Invalid role",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Token is valid",
      role: "seller",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
