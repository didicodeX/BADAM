import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="text-xl font-bold ">
      <Link
        to="/"
        className="flex items-center gap-2 transition hover:text-cta-500"
      >
        <img src="/BadamLogo.svg" alt="BadamLogo" className="h-8 w-auto" />
        <span>Badam</span>
      </Link>
    </div>
  );
}
