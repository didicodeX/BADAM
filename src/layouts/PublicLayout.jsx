import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/shared/components/Navbar";
import NavbarMobilePublic from "@/shared/components/NavbarMobilePublic";
import Footer from "@/shared/components/Footer";
import ScrollToTop from "@/shared/components/ScrollToTop";
import { useSearchStore } from "@/features/search/store/search.store";
import SearchPage from "@/features/search/pages/SearchPage";
import { useAuthStore } from "@/features/auth/store/auth.store";
import NavbarMobile from "@/shared/components/NavbarMobile";

export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { query } = useSearchStore();
  const { user } = useAuthStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const forceOpenSearch =
    location.pathname === "/search" &&
    sessionStorage.getItem("badam:search:autoFocus") === "1";

  return (
    <div className="min-h-screen flex flex-col relative">
      <ScrollToTop />
      {/* Navbar desktop */}
      <div className="hidden lg:block">
        <Navbar />
      </div>

      {/* Navbar mobile */}
      <div className="block lg:hidden">
        {user ? (
          <NavbarMobile
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            forceOpenSearchOnMount={forceOpenSearch}
          />
        ) : (
          <NavbarMobilePublic
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            forceOpenSearchOnMount={forceOpenSearch}
          />
        )}{" "}
      </div>

      {/* Overlay quand menu mobile est ouvert */}
      {menuOpen && (
        <div
          className="absolute inset-0 bg-background-100/20 z-10 transition-opacity duration-300 ease-in-out opacity-100"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Contenu principal */}
      <main className={`${menuOpen ? "z-0" : "relative z-20"} pt-16 flex-1`}>
        {query.trim() ? <SearchPage /> : <Outlet />}
      </main>

      <footer className={`${menuOpen ? "z-0" : "relative z-20"}`}>
        <Footer variant="minimal" />{" "}
      </footer>
    </div>
  );
}
