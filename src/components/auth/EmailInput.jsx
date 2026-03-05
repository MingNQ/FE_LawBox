export default function EmailInput({ placeholder, value, onEmailChange }) {
  return (
    <input
      name="email"
      placeholder={placeholder}
      value={value}
      onChange={onEmailChange}
      className="w-full border px-3 py-2 rounded"
    />
  );
}
