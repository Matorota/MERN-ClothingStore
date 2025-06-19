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
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
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
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:opacity-80"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/124/124021.png"
              alt="Twitter"
              className="h-8 w-8"
            />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:opacity-80"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              alt="LinkedIn"
              className="h-8 w-8"
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:opacity-80"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
              alt="Instagram"
              className="h-8 w-8"
            />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:opacity-80"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/124/124010.png"
              alt="Facebook"
              className="h-8 w-8"
            />
          </a>
        </div>
      </section>
    </main>
  );
}
