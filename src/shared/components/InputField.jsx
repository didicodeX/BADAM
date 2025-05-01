import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; 
export default function InputField({ placeholder, error, type = "text", ...rest }) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="space-y-1 relative">
      <input
        {...rest}
        type={isPassword && showPassword ? "text" : type} 
        placeholder={placeholder}
        className="w-full px-6 py-3 bg-transparent border rounded-md border-text-200 pr-10"
      />
      {isPassword && (
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-6 top-5 -translate-y-1/2 text-text-700"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
      {error && <p className="text-error-700 text-sm">{error.message}</p>}
    </div>
  );
}
