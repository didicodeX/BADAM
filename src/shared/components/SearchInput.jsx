// shared/components/SearchInput.jsx
import { useState, useRef, useEffect } from "react";
import { useSearchStore } from "@/features/search/store/search.store";
import { Search, X } from "lucide-react";

export default function SearchInput({ autoFocus = false, onClose }) {
  const { query, setQuery } = useSearchStore();
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim() && typeof onClose === "function") {
      onClose(); // Revenir à la navbar mobile normale
    }
  };

  const handleClear = () => {
    setQuery("");
    if (typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <div
      className={`flex items-center border rounded-full px-4 py-2 bg-transparent w-full max-w-xl transition
    ${isFocused ? "border-cta-500  outline-cta-200" : "border-text-200"}`}
    >
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Rechercher une session..."
        className="flex-1 bg-transparent focus:outline-none text-sm placeholder-text-400"
      />
      {query ? (
        <X
          className="w-5 h-5 cursor-pointer text-text-400"
          onClick={handleClear}
        />
      ) : (
        <Search className="w-5 h-5 text-text-400" />
      )}
    </div>
  );
}
