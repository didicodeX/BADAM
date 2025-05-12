import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useLiveSearchRedirect(query) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const trimmed = query.trim();

    const delay = setTimeout(() => {
      if (trimmed && location.pathname !== "/search") {
        // 🔐 Enregistre l'origine + déclenche autoFocus sur /search
        sessionStorage.setItem("badam:search:returnTo", location.pathname);
        sessionStorage.setItem("badam:search:autoFocus", "1");
        navigate(`/search?query=${encodeURIComponent(trimmed)}`);
      }

      if (!trimmed && location.pathname === "/search") {
        const returnTo = sessionStorage.getItem("badam:search:returnTo");
        navigate(returnTo || "/", { replace: true });
        sessionStorage.removeItem("badam:search:returnTo");
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query, location, navigate]);
}
