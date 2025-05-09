import DashboardNavbar from "@/features/dashboard/components/DashboardNavbar";
import DashboardNavbarMobile from "@/features/dashboard/components/DashboardNavbarMobile";
import DashboardSidebar from "@/features/dashboard/components/DashboardSidebar";
import BottomNav from "@/features/dashboard/components/BottomNav";

import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import ScrollToTop from "@/shared/components/ScrollToTop";

export default function DashboardLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

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
    <>
      <div className="min-h-screen flex">
        <ScrollToTop />
        {/* Sidebar toujours fixe */}
        <div className="h-screen sticky top-0 z-50 hidden md:block">
          <DashboardSidebar />
        </div>

        <div className="flex-1 flex flex-col">
          {/* Navbar desktop */}
          <div className="hidden md:block">
            <DashboardNavbar />
          </div>

          {/* Navbar mobile */}
          <div className="block md:hidden">
            <DashboardNavbarMobile
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
            />
          </div>

          {/* Main Content */}
          <div className="relative flex-1 overflow-hidden">
            {menuOpen && (
              <div
                className="absolute inset-0 bg-background-100/20 z-10"
                onClick={() => setMenuOpen(false)}
              />
            )}

            <main
              className={`${
                menuOpen ? "z-0" : "relative z-20"
              } transition-all pt-16 pb-16`} // 👈 ajoute pb pour ne pas cacher le contenu derrière la BottomNav
            >
              <Outlet />
            </main>
          </div>
        </div>
      </div>

      {/* Bottom navigation mobile only */}
        <BottomNav />

    </>
  );
}
