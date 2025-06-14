import { Link } from "react-router-dom";

export default function Features() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100 py-24">
      <section className="mx-0 flex min-h-[90vh] w-full max-w-[1800px] flex-col gap-24 rounded-3xl bg-white p-16 shadow-2xl">
        <div className="flex flex-col items-center gap-24 md:flex-row">
          <div className="flex-1">
            <h1 className="mb-6 text-6xl font-extrabold text-blue-700 drop-shadow">
              Why Shop With Us?
            </h1>
            <p className="mb-8 text-2xl text-gray-700">
              Discover a shopping experience that’s fast, fun, and full of
              perks. We’ve built our platform to make your life easier and your
              shopping more rewarding.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-16 md:flex-row">
          <div className="flex flex-1 flex-col gap-6">
            <h2 className="mb-4 text-4xl font-extrabold text-blue-700 drop-shadow">
              Built for You
            </h2>
            <p className="text-2xl text-gray-700">
              Our platform is designed with you in mind. Enjoy a seamless,
              secure, and personalized shopping experience on any device.
            </p>
            <ul className="list-disc space-y-2 pl-8 text-lg text-gray-600">
              <li>Personalized recommendations</li>
              <li>Easy returns & hassle-free refunds</li>
              <li>Secure checkout & multiple payment options</li>
              <li>Mobile-friendly and lightning fast</li>
            </ul>
            <Link
              to="/product"
              className="mt-6 inline-block rounded-lg bg-blue-500 px-10 py-4 text-2xl font-bold text-white shadow transition hover:bg-pink-500"
            >
              Start Shopping Now
            </Link>
          </div>
          <div className="flex flex-1 justify-center">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80"
              alt="Happy Customer"
              className="w-full max-w-xl rounded-2xl border-4 border-white object-cover shadow-xl"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
