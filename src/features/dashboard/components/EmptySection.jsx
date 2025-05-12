import { Link } from "react-router-dom";

export default function EmptySection({ title, link, icon }) {
  return (
    <div className="flex flex-col items-center text-center gap-2 text-text-500 justify-center w-full">
      <p className="text-center mt-4">{title}</p>
      <Link
        to={link.to}
        className="flex items-center gap-2 transition text-cta-500 hover:text-cta-700 font-medium"
      >
        <span>{link.label}</span>
        {icon}
      </Link>
    </div>
  );
}
