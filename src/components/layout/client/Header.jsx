import { Gavel } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const [isAuth, setIsAuth] = useState(false);

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
          <Link className="text-blue-700 dark:text-slate-200 text-sm font-semibold hover:underline hover:decoration-blue-700">
            Tra cứu
          </Link>
          <Link
            to="/chat"
            className="text-blue-700 dark:text-slate-200 text-sm font-semibold hover:underline hover:decoration-blue-700"
          >
            Hỏi đáp AI
          </Link>
          <Link className="text-blue-700 dark:text-slate-200 text-sm font-semibold hover:underline hover:decoration-blue-700">
            Tin tức pháp luật
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            to={"auth/sign-in"}
            className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-blue-700 text-white text-sm font-bold shadow-md hover:bg-blue-800 transition-all"
          >
            <span>Đăng nhập</span>
          </Link>
          {isAuth && (
            <div className="w-10 h-10">
              <img
                src="images/default-avatar.jpg"
                alt=""
                className="w-full h-full rounded-full hover:scale-105 cursor-pointer transition-all"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
