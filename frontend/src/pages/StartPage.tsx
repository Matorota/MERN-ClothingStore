import { Link } from "react-router-dom";

export default function StartPage() {
  return (
    <main className="w-full bg-white">
      <section className="relative flex min-h-[calc(100vh-112px)] w-full items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1920&q=80"
          alt="Shopping Welcome"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex w-full flex-col items-center justify-center px-4 py-24">
          <h1 className="mb-4 text-center text-5xl font-extrabold text-white drop-shadow-lg sm:text-6xl">
            Shop With Us
          </h1>
          <p className="mx-auto mb-8 w-full max-w-3xl text-center text-lg text-gray-100 drop-shadow sm:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            assumenda ea quo cupiditate facere deleniti fuga officia.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/product"
              className="rounded border-2 border-white bg-black/70 px-8 py-3 text-lg font-semibold text-white transition hover:bg-white hover:text-black"
            >
              Shop Now
            </Link>
            <a
              href="#site-description"
              className="rounded border-2 border-white bg-white/80 px-8 py-3 text-lg font-semibold text-black transition hover:bg-black hover:text-white"
            >
              Description
            </a>
          </div>
        </div>
      </section>
      <section
        id="site-description"
        className="relative flex w-full flex-col items-center justify-center gap-10 bg-slate-50 px-0 py-20 md:flex-row"
      >
        <div className="flex w-full flex-1 flex-col items-start px-8 py-6">
          <h2 className="mb-6 text-4xl font-extrabold text-blue-700 drop-shadow sm:text-5xl">
            Welcome to Your Ultimate Shopping Destination!
          </h2>
          <div className="mb-6 h-2 w-24 rounded bg-gradient-to-r from-blue-400 via-pink-400 to-orange-400" />
          <p className="mb-6 max-w-2xl text-xl leading-relaxed font-medium text-gray-800 drop-shadow">
            Step into a world where shopping is not just easy—it's exciting! Our
            platform brings you the freshest trends, exclusive deals, and a
            handpicked selection of products for every style and need. Whether
            you're revamping your wardrobe, upgrading your gadgets, or searching
            for the perfect gift, we've got you covered.
          </p>
          <div className="mb-6 flex flex-wrap gap-6">
            <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=60&q=80"
                alt="Support"
                className="h-12 w-12 rounded-full object-cover"
              />
              <span className="font-semibold text-blue-700">
                Friendly 24/7 Support
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow">
              <img
                src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=60&q=80"
                alt="Delivery"
                className="h-12 w-12 rounded-full object-cover"
              />
              <span className="font-semibold text-orange-600">
                Lightning-Fast Delivery
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow">
              <img
                src="https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=60&q=80"
                alt="Quality"
                className="h-12 w-12 rounded-full object-cover"
              />
              <span className="font-semibold text-pink-600">
                Quality You Can Trust
              </span>
            </div>
          </div>
          <p className="text-lg font-semibold text-blue-600">
            Dive in, explore, and let us make your shopping journey
            unforgettable!
          </p>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80"
            alt="Happy Shopping"
            className="w-full max-w-md rounded-xl border-4 border-white object-cover shadow-2xl"
          />
        </div>
      </section>
      <section className="flex w-full items-center justify-center bg-gradient-to-r from-orange-100 via-blue-100 to-pink-100 px-0 py-12">
        <div className="flex w-full max-w-7xl flex-col items-center gap-8 px-4 md:flex-row">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
            alt="Fun Shopping"
            className="h-40 w-40 rounded-full border-4 border-white object-cover shadow-xl"
          />
          <div className="w-full">
            <h3 className="mb-2 text-2xl font-bold text-pink-600">
              Shopping is Fun!
            </h3>
            <p className="mb-2 text-gray-700">
              Join our community and enjoy exclusive offers, seasonal sales, and
              surprise gifts. We believe shopping should be joyful and
              rewarding!
            </p>
            <div className="mt-4 flex gap-4">
              <span className="inline-block rounded-full bg-orange-400 px-4 py-2 text-sm font-semibold text-white shadow">
                🎉 Flash Sales
              </span>
              <span className="inline-block rounded-full bg-blue-400 px-4 py-2 text-sm font-semibold text-white shadow">
                🛒 New Arrivals
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
