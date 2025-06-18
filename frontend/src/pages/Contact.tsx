import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setLoading(true);
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID!,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY!,
      )
      .then(
        () => {
          setSent(true);
          setLoading(false);
          if (form.current) form.current.reset();
        },
        (error) => {
          alert("Failed to send: " + error.text);
          setLoading(false);
        },
      );
  };

  return (
    <main className="flex min-h-[calc(100vh-112px)] w-full items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100">
      <section className="mx-4 w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl">
        <h1 className="mb-2 text-center text-4xl font-extrabold text-blue-700 drop-shadow">
          Contact Us
        </h1>
        <p className="mb-8 text-center text-gray-600">
          We'd love to hear from you! Fill out the form below and our team will
          get back to you soon.
        </p>
        {sent ? (
          <div className="py-8 text-center">
            <div className="mb-4 text-lg font-semibold text-green-600">
              Thank you! Your message has been sent.
            </div>
            <button
              onClick={() => setSent(false)}
              className="text-blue-600 hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-6">
            <div>
              <label
                className="mb-1 block font-semibold text-gray-700"
                htmlFor="from_name"
              >
                Name
              </label>
              <input
                id="from_name"
                name="from_name"
                type="text"
                required
                className="w-full rounded-md border border-blue-200 px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label
                className="mb-1 block font-semibold text-gray-700"
                htmlFor="from_email"
              >
                Email
              </label>
              <input
                id="from_email"
                name="from_email"
                type="email"
                required
                className="w-full rounded-md border border-blue-200 px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label
                className="mb-1 block font-semibold text-gray-700"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full resize-none rounded-md border border-blue-200 px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                placeholder="How can we help you?"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-gradient-to-r from-blue-400 to-pink-400 py-3 text-lg font-bold text-white shadow-lg transition hover:from-pink-400 hover:to-blue-400 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
        <div className="mt-8 flex flex-col items-center gap-2 text-sm text-gray-500">
          <span>Or reach us at:</span>
          <a
            href="mailto:matasmatasp@gmail.com"
            className="font-medium text-blue-600 hover:underline"
          >
            matasmatasp@gmail.com
          </a>
          <span>123 Market Street, Shop City</span>
          <span>+1 (555) 123-4567</span>
        </div>
        <div className="mt-8 flex justify-center gap-6">
          <a href="#" className="transition hover:text-blue-500">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.84 1.95 3.62-.72-.02-1.4-.22-1.99-.55v.06c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.11 2.94 3.97 2.97A8.6 8.6 0 0 1 2 19.54c-.65 0-1.29-.04-1.92-.11A12.13 12.13 0 0 0 6.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.18 8.18 0 0 0 22.46 6z" />
            </svg>
          </a>
          <a href="#" className="transition hover:text-blue-700">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.67a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm15.11 12.78h-3.56v-5.6c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95v5.7h-3.56V9h3.42v1.56h.05c.48-.91 1.65-1.86 3.4-1.86 3.64 0 4.31 2.4 4.31 5.51v6.24z" />
            </svg>
          </a>
          <a href="#" className="transition hover:text-pink-500">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.16c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41.59.22 1.01.48 1.45.92.44.44.7.86.92 1.45.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43-.22.59-.48 1.01-.92 1.45-.44.44-.86.7-1.45.92-.46.17-1.26.354-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41-.59-.22-1.01-.48-1.45-.92-.44-.44-.7-.86-.92-1.45-.17-.46-.354-1.26-.41-2.43C2.172 15.834 2.16 15.45 2.16 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43.22-.59.48-1.01.92-1.45.44-.44.86-.7 1.45-.92.46-.17 1.26-.354 2.43-.41C8.416 2.172 8.8 2.16 12 2.16zm0-2.16C8.736 0 8.332.012 7.052.07 5.77.128 4.84.31 4.05.54c-.82.24-1.5.56-2.18 1.24-.68.68-1 .86-1.24 2.18C.31 4.84.128 5.77.07 7.052.012 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.058 1.282.24 2.212.47 3.002.24.82.56 1.5 1.24 2.18.68.68.86 1 2.18 1.24.79.23 1.72.412 3.002.47C8.332 23.988 8.736 24 12 24s3.668-.012 4.948-.07c1.282-.058 2.212-.24 3.002-.47.82-.24 1.5-.56 2.18-1.24.68-.68 1-1 1.24-2.18.23-.79.412-1.72.47-3.002.058-1.28.07-1.684.07-4.948s-.012-3.668-.07-4.948c-.058-1.282-.24-2.212-.47-3.002-.24-.82-.56-1.5-1.24-2.18-.68-.68-1-1-2.18-1.24-.79-.23-1.72-.412-3.002-.47C15.668.012 15.264 0 12 0z" />
              <circle cx="12" cy="12" r="3.6" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
}
