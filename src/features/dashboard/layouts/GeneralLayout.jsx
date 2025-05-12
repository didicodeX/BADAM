// layouts/GeneralLayout.jsx
import Breadcrumbs from "@/shared/components/Breadcrumbs";
import ScrollToTop from "@/shared/components/ScrollToTop";
import { Outlet } from "react-router-dom";

export default function GeneralLayout() {
  return (
    <div>
      <ScrollToTop/>
      <Breadcrumbs />
      <Outlet />
    </div>
  );
}
