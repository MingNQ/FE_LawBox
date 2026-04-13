import { Loader2 } from "lucide-react";

export function LoadingModal({ isOpen, message = "Đang xử lý dữ liệu..." }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-500">
      <div className="flex flex-col items-center gap-6 transform animate-in zoom-in-95 duration-300">
        <div className="relative flex items-center justify-center">
          {/* Pulsing Outer Ring */}
          <div className="absolute w-24 h-24 rounded-full bg-blue-500/20 animate-ping" />
          
          {/* Glass Circle */}
          <div className="relative w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
          </div>
        </div>

        <div className="text-center px-6">
          <p className="text-white text-lg font-bold tracking-tight mb-2 drop-shadow-md">
            Hệ thống đang xử lý
          </p>
          <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-lg">
            <p className="text-blue-100 text-sm font-medium">
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
