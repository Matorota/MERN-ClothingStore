import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="w-full border-b border-blue-300 bg-gradient-to-r from-blue-200 via-blue-100 to-pink-100 shadow-md">
      <div className="flex w-full items-center justify-between px-8 py-3">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-blue-700 transition-transform hover:scale-105"
        >
          PersonalProject
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="rounded px-2 py-1 font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-700"
          >
            Home
          </Link>
          <Link
            to="/features"
            className="rounded px-2 py-1 font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-700"
          >
            Features
          </Link>
          <Link
            to="/pricing"
            className="rounded px-2 py-1 font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-700"
          >
            Pricing
          </Link>
          <Link
            to="/support"
            className="rounded px-2 py-1 font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-700"
          >
            Support
          </Link>
          <Link
            to="/product"
            className="rounded px-2 py-1 font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-700"
          >
            Product
          </Link>
        </div>
      </div>
    </nav>
  );
}
