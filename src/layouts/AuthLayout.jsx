import ScrollToTop from "@/shared/components/ScrollToTop";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="min-h-screen grid md:grid-cols-2 items-center justify-center">
      <ScrollToTop />
      <Outlet />
    </main>
  );
}
