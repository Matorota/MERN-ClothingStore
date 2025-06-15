import { Link } from "react-router-dom";

export default function Description() {
  return (
    <main className="w-full bg-white">
      <section
        id="site-description"
        className="relative flex w-full flex-col items-center justify-center gap-10 bg-slate-50 px-0 py-20 md:flex-row"
      >
        <div className="flex w-full flex-1 flex-col items-start px-8 py-6">
          <h2 className="mb-6 text-4xl font-extrabold text-blue-700 drop-shadow sm:text-5xl">
            Welcome to Your Ultimate Shopping Destination!
          </h2>
          <p className="mb-6 max-w-2xl text-xl leading-relaxed font-medium text-gray-800 drop-shadow">
            Step into a world where shopping is not just easy—it's exciting! Our
            platform brings you the freshest trends, exclusive deals, and a
            handpicked selection of products for every style and need. Whether
            you're revamping your wardrobe, upgrading your gadgets, or searching
            for the perfect gift, we've got you covered.
          </p>

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
          <div className="w-full">
            <h3 className="mb-2 text-2xl font-bold text-pink-600">
              Shopping is Fun!
            </h3>
            <p className="mb-2 text-gray-700">
              Shop with us if you want to have the best experience!!!
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
