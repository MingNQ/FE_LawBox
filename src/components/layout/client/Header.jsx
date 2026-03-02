export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e7ebf3] dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="text-primary">
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
          <h2 className="text-[#0d121b] dark:text-white text-xl font-extrabold tracking-tight">
            Vietnam Law Portal
          </h2>
        </div>
        <nav className="hidden md:flex flex-1 justify-center gap-10">
          <a
            className="text-[#0d121b] dark:text-slate-200 text-sm font-semibold hover:underline hover:decoration-blue-700"
            href="#"
          >
            Tra cứu
          </a>
            <a
            className="text-[#0d121b] dark:text-slate-200 text-sm font-semibold hover:underline hover:decoration-blue-700"
            href="#"
          >
            Hỏi đáp AI
          </a>
          <a
            className="text-[#0d121b] dark:text-slate-200 text-sm font-semibold hover:underline hover:decoration-blue-700"
            href="#"
          >
            Tin tức pháp luật
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold shadow-md bg-blue-700 hover:bg-blue-800 transition-all">
            <span>Đăng nhập</span>
          </button>
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-slate-200 dark:border-slate-700"
            data-alt="Default user avatar placeholder"
            style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD731eEIId2YWPofRNuCJb0geizNZnIUsGg04RYApIO81VwCrcf5oR4Vsnl5XHETXKXEG-sl-5W7_F_sJLLFsOf9tPKd1oZj4yC0LEccTIbMOKmotUKWQC_y5WBj8XcF2zdlH3DCbXBqEomESFJQ27VixUSLRAVo6bHDIUiYCVxyf-1FWh1TTbPdTA_fsLHsBrh77zZrKJCPoWY0I2CRkSjRZDXjX-yuLrSL6RM_5IXQ1NrPLPvegL0GNcLbKiOEmYC1U6BsGRRrDw5")'}}
          ></div>
        </div>
      </div>
    </header>
  );
}
