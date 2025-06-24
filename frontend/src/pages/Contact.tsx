import { useRef, useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setLoading(true);

    const formData = new FormData(form.current);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    console.log("Sending data:", data);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_SERVER_URL}/api/send-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();
      console.log("Response:", result);

      if (response.ok) {
        setSent(true);
        setLoading(false);
        if (form.current) form.current.reset();
      } else {
        throw new Error(result.message || "Failed to send email");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      alert("Failed to send message. Please try again.");
      setLoading(false);
    }
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
              Thank you! Your message has been sent to matasmatasp@gmail.com!
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
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-md border border-blue-200 px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label
                className="mb-1 block font-semibold text-gray-700"
                htmlFor="email"
              >
                Your Email (any email works)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-md border border-blue-200 px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                placeholder="matas.strimaitis@stud.viko.lt"
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
          <span>Messages will be sent to:</span>
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
