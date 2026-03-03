import { useState } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e7ebf3] dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="text-blue-700">
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h2 className="text-blue-700 dark:text-white text-xl font-extrabold tracking-tight">
            LawBox
          </h2>
        </div>
        <nav className="hidden md:flex flex-1 justify-center gap-10">
          <Link
            className="text-blue-700 dark:text-slate-200 text-sm font-semibold hover:underline hover:decoration-blue-700"
          >
            Tra cứu
          </Link>
          <Link
            to="/chat"
            className="text-blue-700 dark:text-slate-200 text-sm font-semibold hover:underline hover:decoration-blue-700"
          >
            Hỏi đáp AI
          </Link>
          <Link
            className="text-blue-700 dark:text-slate-200 text-sm font-semibold hover:underline hover:decoration-blue-700"
          >
            Tin tức pháp luật
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <button className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-blue-700 text-white text-sm font-bold shadow-md hover:bg-blue-800 transition-all">
            <span>Đăng nhập</span>
          </button>
          {isAuth && (
            <div
              className="w-10 h-10"
            >
              <img src="images/default-avatar.jpg" alt="" className="w-full h-full rounded-full hover:scale-105 cursor-pointer transition-all" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
