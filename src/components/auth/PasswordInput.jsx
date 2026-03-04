import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export function PasswordInput({ value, onChange, placeholder, name }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        className="w-full border px-3 py-2 rounded pr-10"
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
