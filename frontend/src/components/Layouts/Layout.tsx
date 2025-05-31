import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <NavBar />
      <main className="flex flex-1 flex-col items-center">{children}</main>
      <Footer />
    </div>
  );
}
