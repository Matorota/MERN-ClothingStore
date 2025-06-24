import { Request, Response } from "express";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY!;

console.log("RESEND_API_KEY in controller:", resendApiKey);

if (!resendApiKey) {
  console.error("RESEND_API_KEY is missing!");
  throw new Error("RESEND_API_KEY environment variable is required");
}

const resend = new Resend(resendApiKey);

export const sendContactEmail = async (
  req: Request<{}, {}, { name: string; email: string; message: string }>,
  res: Response
) => {
  try {
    const { name, email, message } = req.body;

    console.log("Received contact form data:", { name, email, message });

    if (!name || !email || !message) {
      return res.status(400).json({
        status: 400,
        message: "All fields are required",
      });
    }

    console.log("Sending email with Resend...");

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "matasmatasp@gmail.com",
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Contact Form Submission</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 6px; border-left: 4px solid #2563eb;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          <p style="color: #64748b; font-size: 14px;">
            This message was sent from your website contact form.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(400).json({
        status: 400,
        message: "Failed to send email",
        error: error,
      });
    }

    console.log("Email sent successfully:", data);

    res.status(200).json({
      status: 200,
      message: "Email sent successfully",
      data: data,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};
