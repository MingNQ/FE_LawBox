export function ToastContainer({ toasts, onClose }) {
  return (
    <div className="fixed top-20 right-6 z-50 space-y-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            relative
            w-full max-w-sm
            px-4 py-3 pr-10
            rounded-lg text-white
            shadow-lg hover:shadow-xl
            transition transform hover:-translate-y-0.5
            animate-slide-in
            break-words  
            ${
              toast.type === "success"
                ? "bg-green-600"
                : toast.type === "error"
                  ? "bg-red-600"
                  : "bg-blue-600"
            }
          `}
        >
          <div className="text-sm">{toast.message}</div>

          <button
            onClick={() => onClose(toast.id)}
            className="absolute top-2 right-2 text-white/80 hover:text-white"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
