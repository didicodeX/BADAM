import { Wrench, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 px-4">
        <Wrench className="w-20 h-20 text-cta-500" />
        <h1 className="text-2xl font-bold">Fonctionnalité en cours de construction</h1>
        <p className="max-w-md text-gray-600">
          Cette section est encore en chantier. Reviens bientôt, on y travaille !
        </p>
        <Link
          to="/"
          className="px-4 py-3 flex items-center gap-2 bg-disabled-200 rounded-lg text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
      </div>
      <Footer variant="minimal" />
    </div>
  );
}
