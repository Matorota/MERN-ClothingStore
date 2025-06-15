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
              href="/description"
              className="rounded border-2 border-white bg-white/80 px-8 py-3 text-lg font-semibold text-black transition hover:bg-black hover:text-white"
            >
              Description
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
