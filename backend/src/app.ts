import express from "express";
import cors from "cors";
import "dotenv/config";

import { logDbConnection } from "./config/db";
import { productRoutes } from "./routes/product";



const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.use(cors({ origin: process.env.FRONTEND_BASE_URL }));
app.use("/api", productRoutes);
app.use(productRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
  logDbConnection();
});
