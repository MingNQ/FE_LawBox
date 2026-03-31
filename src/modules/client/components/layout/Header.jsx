import { Gavel } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@shared/constants/routes";

export function Header({ user }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e7ebf3] dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="text-blue-700">
            <Gavel className="w-8 h-8" />
          </div>
          <h2 className="text-blue-700 dark:text-white text-xl font-extrabold tracking-tight">
            LawBox
          </h2>
        </div>
        <nav className="hidden md:flex flex-1 justify-center gap-10">
          <Link to={ROUTES.LEGAL_SEARCH} className="text-blue-700 dark:text-slate-200 text-sm font-semibold hover:underline hover:decoration-blue-700">
            Tra cứu
          </Link>
          <Link
            to={ROUTES.CHAT}
            className="text-blue-700 dark:text-slate-200 text-sm font-semibold hover:underline hover:decoration-blue-700"
          >
            Hỏi đáp AI
          </Link>
          <Link className="text-blue-700 dark:text-slate-200 text-sm font-semibold hover:underline hover:decoration-blue-700">
            Tin tức pháp luật
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {!user ? <></> : <p>Chào, {user.fullName}</p>}
        </div>
      </div>
    </header>
  );
}
