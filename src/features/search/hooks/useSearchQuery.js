import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

export function useSearchQuery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("query") || "";
  const [query, setQuery] = useState(queryFromUrl);

  // Keep state in sync with URL changes
  useEffect(() => {
    setQuery(queryFromUrl);
  }, [queryFromUrl]);

  // Update URL when query changes
  const updateQuery = useCallback(
    (newQuery) => {
      setQuery(newQuery);
      if (newQuery.trim()) {
        setSearchParams({ query: newQuery });
      } else {
        setSearchParams({});
      }
    },
    [setSearchParams]
  );

  const isEmpty = query.trim() === "";

  return {
    query,
    setQuery: updateQuery,
    isEmpty,
  };
}
