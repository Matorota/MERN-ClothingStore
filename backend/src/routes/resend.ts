import express, { Request, Response } from "express";
import { sendContactEmail } from "../controllers/resend";

const router = express.Router();

router.post("/send-email", (req: Request, res: Response) => {
  sendContactEmail(req, res);
});

export { router as emailRoutes };
