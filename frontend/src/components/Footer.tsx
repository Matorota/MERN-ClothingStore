export default function Footer() {
  return (
    <footer className="mt-12 w-full border-t border-blue-200 bg-blue-100 py-6">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-2 px-4 sm:flex-row">
        <div className="text-sm text-blue-700">
          &copy; {new Date().getFullYear()} My MERN Shop. All rights reserved.
        </div>
        <div className="flex gap-4 text-xs text-blue-600">
          <a
            href="#"
            className="transition hover:text-blue-800 hover:underline"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="transition hover:text-blue-800 hover:underline"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="transition hover:text-blue-800 hover:underline"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
