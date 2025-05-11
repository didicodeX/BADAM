// layouts/GeneralLayout.jsx
import Breadcrumbs from "@/shared/components/Breadcrumbs";
import { Outlet } from "react-router-dom";

export default function GeneralLayout() {
  return (
    <div className="px-4 md:px-6 pt-4">
      <Breadcrumbs />
      <Outlet />
    </div>
  );
}
