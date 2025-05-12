import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex flex-col items-center text-center justify-center gap-12">
        <img src="/img/404.png" alt="404 Not Found" className="h-auto" />
        <div className="flex flex-col items-center gap-3">
          <h1 className="font-black">PAGE NOT FOUND</h1>
          <div>
            <p>Oups, on dirait qu'aucune formation n'est prévue ici.</p>
            <p>
              Vous pouvez retourner à la page d'accueil ou explorer nos autres
              formations.
            </p>
          </div>
        </div>
        <div className="mt-4">
          <Link
            to="/"
            className="px-4 py-3 flex gap-2 bg-disabled-200 rounded-lg"
          >
            <ArrowLeft />
            Retour
          </Link>
        </div>
      </div>
      <Footer variant="minimal" />
    </div>
  );
}
