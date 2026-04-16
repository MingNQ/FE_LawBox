import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export function PasswordInput({ value, onChange, placeholder, name, required }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#161b22] text-slate-800 dark:text-slate-200 px-3 py-2 rounded pr-10 placeholder:text-slate-400"
        required={required}
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] text-sm"
      >
        {show ? <EyeClosed /> : <Eye />}
      </button>
    </div>
  );
}
