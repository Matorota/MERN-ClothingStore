export default function Pricing() {
  return (
    <main className="flex min-h-[calc(100vh-112px)] w-full items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100 py-16">
      <section className="mx-4 flex w-full max-w-6xl flex-col gap-16 rounded-3xl bg-white p-12 shadow-2xl">
        <div className="text-center">
          <h1 className="mb-2 text-5xl font-extrabold text-blue-700 drop-shadow">
            Our Pricing Plans
          </h1>
          <p className="text-lg text-gray-600">
            Find the perfect plan for your shopping journey. Transparent,
            flexible, and packed with value.
          </p>
        </div>
        <div className="flex flex-col items-stretch justify-center gap-10 md:flex-row">
          <div className="flex flex-1 flex-col rounded-2xl border border-blue-100 bg-blue-50 p-10 shadow transition hover:shadow-lg">
            <h2 className="mb-2 text-2xl font-bold text-blue-700">Basic</h2>
            <p className="mb-4 text-4xl font-extrabold text-blue-700">$0</p>
            <ul className="mb-8 flex-1 space-y-2 text-gray-700">
              <li>✔ Unlimited browsing</li>
              <li>✔ Access to all categories</li>
              <li>✔ Standard support</li>
            </ul>
            <button className="w-full rounded-lg bg-blue-500 py-3 text-lg font-semibold text-white shadow transition hover:bg-blue-600">
              Get Started
            </button>
          </div>
          <div className="z-10 flex flex-1 scale-105 flex-col rounded-2xl border-2 border-pink-300 bg-pink-50 p-10 shadow-lg">
            <h2 className="mb-2 text-2xl font-bold text-pink-600">Pro</h2>
            <p className="mb-4 text-4xl font-extrabold text-pink-600">
              $9<span className="text-lg font-normal">/mo</span>
            </p>
            <ul className="mb-8 flex-1 space-y-2 text-gray-700">
              <li>✔ Everything in Basic</li>
              <li>✔ Free shipping on all orders</li>
              <li>✔ Early access to sales</li>
              <li>✔ Priority support</li>
            </ul>
            <button className="w-full rounded-lg bg-pink-500 py-3 text-lg font-semibold text-white shadow transition hover:bg-pink-600">
              Go Pro
            </button>
          </div>
          <div className="flex flex-1 flex-col rounded-2xl border border-orange-200 bg-orange-50 p-10 shadow transition hover:shadow-lg">
            <h2 className="mb-2 text-2xl font-bold text-orange-500">Premium</h2>
            <p className="mb-4 text-4xl font-extrabold text-orange-500">
              $19<span className="text-lg font-normal">/mo</span>
            </p>
            <ul className="mb-8 flex-1 space-y-2 text-gray-700">
              <li>✔ Everything in Pro</li>
              <li>✔ Exclusive member rewards</li>
              <li>✔ Personal shopping assistant</li>
              <li>✔ VIP support 24/7</li>
            </ul>
            <button className="w-full rounded-lg bg-orange-400 py-3 text-lg font-semibold text-white shadow transition hover:bg-orange-500">
              Get Premium
            </button>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          All plans include a 7-day free trial. Cancel anytime.
        </div>
      </section>
    </main>
  );
}
