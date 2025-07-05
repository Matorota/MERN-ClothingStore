import "dotenv/config";
import express from "express";
import cors from "cors";

import { logDbConnection } from "./config/db";
import { productRoutes } from "./routes/product";
import { emailRoutes } from "./routes/resend";
import { authRoutes } from "./routes/auth";

const PORT = process.env.PORT || 8030;
const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_BASE_URL }));

app.use("/api", productRoutes);
app.use("/api", emailRoutes);
app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
  console.log("RESEND_API_KEY loaded:", process.env.RESEND_API_KEY ? "✓" : "✗");
  logDbConnection();
});
