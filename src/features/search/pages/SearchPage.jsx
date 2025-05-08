import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchInput from "@/shared/components/SearchInput";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const [search, setSearch] = useState(initialQuery);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setSearch(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const shouldOpen = sessionStorage.getItem("badam:search:autoFocus") === "1";
    if (shouldOpen) {
      setSearchOpen(true);
    }
  }, []);

  return (
    <div className="p-4 space-y-4">
      {searchOpen && (
        <SearchInput mobile onClose={() => setSearchOpen(false)} />
      )}

      <div>
        Affichage des résultats pour : <strong>{search}</strong>
      </div>
    </div>
  );
}

/**
 * import { useSearchResults } from "@/features/search/hooks/useSearchResults";

export default function SearchPage() {
  const { query, data, isLoading, isError } = useSearchResults();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        Résultats pour : <span className="text-cta-500">{query}</span>
      </h1>

      {isLoading && <p>Chargement...</p>}
      {isError && <p className="text-error-500">Une erreur est survenue.</p>}
      {data?.length === 0 && <p>Aucun résultat trouvé.</p>}

      <ul className="space-y-4">
        {data?.map((formation) => (
          <li key={formation._id} className="border p-4 rounded">
            <h2 className="font-semibold">{formation.title}</h2>
            <p>{formation.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

 */
