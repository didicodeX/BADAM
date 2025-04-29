// PublicLayout.jsx
import Navbar from "@/shared/components/Navbar";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div>
      <Navbar/>
      <main>
        <Outlet />
      </main>
      <footer>Footer ici</footer>
    </div>
  );
}
