import { Header } from "./Header";
import { Footer } from "./Footer";

export function ClientLayout({ children }) {
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0d121b] dark:text-slate-200 min-h-screen">
      <Header />
      <main className="w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
