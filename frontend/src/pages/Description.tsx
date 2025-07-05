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
          <div className="mb-6 h-2 w-24 rounded bg-gradient-to-r from-blue-400 via-pink-400 to-orange-400" />
          <p className="mb-6 max-w-2xl text-xl leading-relaxed font-medium text-gray-800 drop-shadow">
            Discover a new era of online shopping with us! Our store is
            dedicated to bringing you a seamless, enjoyable, and secure shopping
            experience. We offer a vast selection of the latest products, from
            trendy fashion and must-have gadgets to unique gifts and everyday
            essentials. Every item is carefully curated for quality and value,
            ensuring you get only the best.
            <br />
            <br />
            Enjoy exclusive deals, seasonal promotions, and a user-friendly
            platform designed to make browsing and purchasing effortless. Our
            intuitive search and personalized recommendations help you find
            exactly what you need, while our fast and reliable delivery ensures
            your order arrives at your doorstep in no time.
            <br />
            <br />
            We pride ourselves on exceptional customer service, with a dedicated
            support team ready to assist you 24/7. Whether you’re shopping for
            yourself or searching for the perfect gift, our store is your
            trusted partner for all things shopping. Join our growing community
            and experience the difference today!
          </p>
          <div className="mb-6 flex flex-wrap gap-6"></div>
          <p className="text-lg font-semibold text-blue-600">
            Dive in, explore, and let us make your shopping journey
            unforgettable!
          </p>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80"
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
