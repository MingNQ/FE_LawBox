import { Header } from "./Header";
import { useAuth } from "@shared/hooks/useAuth";
import { Footer } from "./Footer";

export function ClientLayout({ children }) {
  const { user } = useAuth();

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0d121b] dark:text-slate-200 min-h-screen">
      <Header user={user} />
      <main className="w-full">{children}</main>
      <Footer />
    </div>
  );
}
