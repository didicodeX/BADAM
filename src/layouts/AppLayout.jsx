import Navbar from "@/shared/components/Navbar";
import NavbarMobile from "@/shared/components/NavbarMobile";
import NavbarMobilePublic from "@/shared/components/NavbarMobilePublic";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import Footer from "@/shared/components/Footer";
import ScrollToTop from "@/shared/components/ScrollToTop";

export default function AppLayout() {
  const { user } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const forceOpenSearch =
    location.pathname === "/search" &&
    sessionStorage.getItem("badam:search:autoFocus") === "1";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      {/* Navbar desktop */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Navbar mobile */}
      <div className="block md:hidden">
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
        )}
      </div>

      {/* Main Content */}
      <div className="relative flex-1 overflow-hidden">
        {menuOpen && (
          <div
            className="absolute inset-0 bg-background-100/20 z-10 transition-opacity duration-300 ease-in-out opacity-100"
            onClick={() => setMenuOpen(false)}
          />
        )}
        <main className={`${menuOpen ? "z-0" : "relative z-20"} transition-all pt-16`}>
          <Outlet />
        </main>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}
