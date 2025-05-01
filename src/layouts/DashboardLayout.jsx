import DashboardNavbarMobile from "@/shared/components/DashboardNavbarMobile";
import DashboardNavbar from "@/shared/components/DashboardNavbar";
import DashboardSidebar from "@/shared/components/DashboardSidebar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DashboardLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Réinitialiser menuOpen quand on passe en desktop
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
    <div className="min-h-screen flex">
      {/* Sidebar (desktop only) */}
      <div className="">
        <DashboardSidebar />
      </div>

      <div className="flex-1 flex flex-col">
        {/* Navbar desktop */}
        <div className="hidden md:block">
          <DashboardNavbar />
        </div>

        {/* Navbar mobile */}
        <div className="block md:hidden">
          <DashboardNavbarMobile menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </div>

        {/* Main Content */}
        <div className="relative flex-1 overflow-hidden">
          {/* Main grey overlay only when menu open */}
          {menuOpen && (
            <div
              className="absolute inset-0 bg-background-100/20 z-10 transition-opacity duration-300 ease-in-out opacity-100"
              onClick={() => setMenuOpen(false)}
            />
          )}

          {/* Main content */}
          <main
            className={`${menuOpen ? "z-0" : "relative z-20"} transition-all pt-16`}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
