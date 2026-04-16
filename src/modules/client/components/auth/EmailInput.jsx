export default function EmailInput({ placeholder, value, onEmailChange, required }) {
  return (
    <input
      name="email"
      placeholder={placeholder}
      value={value}
      onChange={onEmailChange}
      className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#161b22] text-slate-800 dark:text-slate-200 px-3 py-2 rounded placeholder:text-slate-400"
      required={required}
    />
  );
}
