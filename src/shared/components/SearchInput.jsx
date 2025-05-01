import { Search, X, ArrowLeft } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useSearchQuery } from "@/features/search/hooks/useSearchQuery";
import { useLiveSearchRedirect } from "@/features/search/hooks/useLiveSearchRedirect";

export default function SearchInput({
  mobile = false,
  onClose,
  autoFocus = false,
}) {
  const { query, setQuery } = useSearchQuery();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useLiveSearchRedirect(query);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div
      className={`${
        mobile
          ? `flex items-center gap-2 rounded px-3 py-2 ${
              isFocused ? "border-cta-500" : "border-text-200"
            }`
          : `flex items-center gap-2 border rounded-full px-4 py-2 shadow-sm w-full max-w-xl ${
              isFocused ? "border-cta-500" : "border-text-200"
            }`
      }`}
    >
      {mobile && (
        <ArrowLeft
          className="w-5 h-5 text-primary cursor-pointer"
          onClick={() => {
            setQuery("");
            if (onClose) onClose(); // onClose est appelé ici
          }}
        />
      )}

      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Rechercher une formation..."
        className={`flex-1 bg-transparent text-sm outline-none placeholder-text-400 px-6 py-0.5 focus:outline-none ${
          mobile ? "focus:border-b focus:border-cta-500" : ""
        }`}
      />

      {query && (
        <X
          type="button"
          className="w-5 h-5 text-primary cursor-pointer"
          onClick={() => setQuery("")}
        />
      )}

      {!mobile && !isFocused && !query && (
        <Search className="w-5 h-5 text-primary" />
      )}
    </div>
  );
}
