import { Link } from "react-router-dom";

export default function Footer({ variant = "default" }) {
  const year = new Date().getFullYear();

  const navLinks = [
    { label: "Formations", to: "/formations" },
    { label: "À propos", to: "/about" },
    { label: "FAQ", to: "/faq" },
    { label: "Mentions légales", to: "/legal" },
  ];

  return (
    <footer className="bg-text-900 text-disabled-50 px-4 py-8 text-sm">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 text-center">
        {variant === "default" && (
          <>
            <p className="text-sm md:text-base">
              Apprendre, progresser et partager sans limite.
            </p>
            <p className="text-xs">
              © {year} BADAM — Tous droits réservés ·{" "}
              <Link to="/terms" className="underline hover:text-white">
                Conditions d'utilisation
              </Link>
            </p>
            <ul className="flex flex-col md:flex-row justify-center gap-3 md:gap-6 text-xs">
              {navLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        {variant === "minimal" && (
          <p className="text-xs text-text-300">
            © {year} BADAM — Tous droits réservés ·{" "}
            <Link to="/terms" className="underline hover:text-white">
              Conditions d'utilisation
            </Link>
          </p>
        )}
      </div>
    </footer>
  );
}
