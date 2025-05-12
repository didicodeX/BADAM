import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { breadcrumbLabels } from "@/shared/config/breadcrumbConfig";

export default function Breadcrumbs({ currentLabel, customLabels = {} }) {
  const location = useLocation();
  const allSegments = location.pathname.split("/").filter(Boolean);

  // Liste des segments à ignorer (ex: techniques ou structurels)
  const ignoredSegments = ["dashboard", "app"];

  const segments = allSegments.filter((seg) => !ignoredSegments.includes(seg));
  const buildPath = (i) => "/" + allSegments.slice(0, i + 1).join("/");

  return (
    <nav className="text-sm text-text-500 flex items-center gap-2 flex-wrap px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-24 pt-6">
      <Link to="/dashboard/home" className="hover:underline font-medium">
        Dashboard
      </Link>

      {segments.map((seg, i) => {
        const indexInAll = allSegments.indexOf(seg);
        const isLast = i === segments.length - 1;
        const label =
          customLabels[seg] || breadcrumbLabels[seg] || decodeURIComponent(seg);

        return (
          <span key={i} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-text-300" />
            {isLast ? (
              <span className="text-text-800 font-semibold capitalize">
                {currentLabel || label}
              </span>
            ) : (
              <Link to={buildPath(indexInAll)} className="hover:underline capitalize">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
