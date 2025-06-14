import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <main className="flex min-h-[calc(100vh-112px)] w-full items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100">
      <section className="mx-4 w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl">
        <h1 className="mb-2 text-center text-4xl font-extrabold text-blue-700 drop-shadow">
          Contact Us
        </h1>
        <p className="mb-8 text-center text-gray-600">
          We'd love to hear from you!
        </p>
        <form className="flex flex-col gap-6">
          <div>
            <label
              className="mb-1 block font-semibold text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
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
              Email
            </label>
            <input
              id="email"
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
              required
              rows={5}
              className="w-full resize-none rounded-md border border-blue-200 px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              placeholder="How can we help you?"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-gradient-to-r from-blue-400 to-pink-400 py-3 text-lg font-bold text-white shadow-lg transition hover:from-pink-400 hover:to-blue-400"
          >
            Send Message
          </button>
        </form>
        <div className="mt-8 flex flex-col items-center gap-2 text-sm text-gray-500">
          <span>Or reach us at:</span>
          <a href="#" className="font-medium text-blue-600 hover:underline">
            support@matumba.com
          </a>
          <span>+360 55555555</span>
        </div>
        <div className="mt-8 flex justify-center gap-6">
          <a href="#" className="transition hover:text-blue-700"></a>
          <a href="#" className="transition hover:text-pink-500"></a>
        </div>
      </section>
    </main>
  );
}
