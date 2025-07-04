export default function Pricing() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-6xl font-extrabold text-gray-900">
            Shop Our Collection
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Discover premium quality clothing at affordable prices. From casual
            wear to luxury pieces, we offer styles for every occasion and
            budget.
          </p>
        </div>

        <div className="mb-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-50"></div>
            <div className="relative">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500 text-white">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Everyday Essentials
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-blue-600">
                  $15 - $45
                </span>
                <span className="ml-2 text-gray-500">per item</span>
              </div>
              <ul className="mb-8 space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="mr-3 text-green-500">✓</span>
                  Basic T-shirts & Tank Tops
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-green-500">✓</span>
                  Comfortable Hoodies
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-green-500">✓</span>
                  Casual Jeans & Pants
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-green-500">✓</span>
                  Everyday Sneakers
                </li>
              </ul>
              <div className="rounded-xl bg-blue-50 p-4">
                <p className="text-sm text-blue-700">
                  <strong>Free shipping</strong> on orders over $50
                </p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-visible rounded-3xl border-4 border-purple-200 bg-white p-8 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="absolute -top-6 left-1/2 z-10 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 text-base font-bold text-white shadow-lg">
              POPULAR
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-100 opacity-50"></div>
            <div className="relative">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500 text-white">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Premium Collection
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-purple-600">
                  $50 - $120
                </span>
                <span className="ml-2 text-gray-500">per item</span>
              </div>
              <ul className="mb-8 space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="mr-3 text-green-500">✓</span>
                  Designer Brand Items
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-green-500">✓</span>
                  Premium Fabrics & Materials
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-green-500">✓</span>
                  Trendy Jackets & Outerwear
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-green-500">✓</span>
                  Fashion-forward Accessories
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-green-500">✓</span>
                  Limited Edition Pieces
                </li>
              </ul>
              <div className="rounded-xl bg-purple-50 p-4">
                <p className="text-sm text-purple-700">
                  <strong>Free express shipping</strong> + 30-day returns
                </p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-100 opacity-50"></div>
            <div className="relative">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500 text-white">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Luxury Line
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-amber-600">
                  $150+
                </span>
                <span className="ml-2 text-gray-500">per item</span>
              </div>
              <ul className="mb-8 space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="mr-3 text-green-500">✓</span>
                  High-end Designer Pieces
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-green-500">✓</span>
                  Exclusive Collections
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-green-500">✓</span>
                  Premium Leather Goods
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-green-500">✓</span>
                  Handcrafted Items
                </li>
              </ul>
              <div className="rounded-xl bg-amber-50 p-4">
                <p className="text-sm text-amber-700">
                  <strong>VIP service</strong> with personal stylist
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mb-16 max-w-4xl rounded-3xl bg-white p-12 shadow-2xl">
          <h2 className="mb-8 text-center text-4xl font-bold text-gray-900">
            How to Shop With Us
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                Browse & Select
              </h3>
              <p className="text-gray-600">
                Explore our curated collection of clothing items. Filter by
                size, color, brand, or price range to find your perfect match.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                Add to Cart
              </h3>
              <p className="text-gray-600">
                Select your size and quantity, then add items to your shopping
                cart. Review your selections before proceeding to checkout.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                Secure Checkout
              </h3>
              <p className="text-gray-600">
                Complete your purchase with our secure payment system. We accept
                all major credit cards, PayPal, and digital wallets.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mb-16 max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-900">
            Payment & Shipping Options
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-8 shadow-xl">
              <div className="mb-6 flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Payment Methods
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="mr-3 text-green-500">✓</span>
                  Credit & Debit Cards (Visa, MasterCard, Amex)
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-green-500">✓</span>
                  PayPal & Apple Pay
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-green-500">✓</span>
                  Buy Now, Pay Later (Klarna, Afterpay)
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-green-500">✓</span>
                  Store Credit & Gift Cards
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-xl">
              <div className="mb-6 flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500 text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Shipping Options
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="mr-3 text-green-500">✓</span>
                    Standard Shipping (5-7 days)
                  </span>
                  <span className="font-semibold text-gray-900">$5.99</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="mr-3 text-green-500">✓</span>
                    Express Shipping (2-3 days)
                  </span>
                  <span className="font-semibold text-gray-900">$12.99</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="mr-3 text-green-500">✓</span>
                    Next Day Delivery
                  </span>
                  <span className="font-semibold text-gray-900">$24.99</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="mr-3 text-green-500">✓</span>
                    Free Shipping (orders $50+)
                  </span>
                  <span className="font-semibold text-green-600">FREE</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-center text-white">
          <h2 className="mb-4 text-4xl font-bold">Ready to Shop?</h2>
          <p className="mb-8 text-xl opacity-90">
            Browse our latest collection and find your perfect style today!
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="/product"
              className="inline-block rounded-xl bg-white px-8 py-4 text-lg font-bold text-purple-600 transition hover:scale-105 hover:bg-gray-100"
            >
              Shop Now
            </a>
            <a
              href="/support"
              className="inline-block rounded-xl border-2 border-white px-8 py-4 text-lg font-bold text-white transition hover:bg-white hover:text-purple-600"
            >
              Contact Us
            </a>
          </div>
        </div>

        <div className="mt-16 text-center text-gray-500">
          <p className="text-sm">
            All prices include VAT • 30-day return policy • Customer
            satisfaction guaranteed
          </p>
        </div>
      </div>
    </main>
  );
}
