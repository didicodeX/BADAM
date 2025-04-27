// PublicLayout.jsx
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div>
      <header>Navbar ici</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer ici</footer>
    </div>
  );
}
