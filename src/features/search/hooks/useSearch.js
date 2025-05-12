// features/search/hooks/useSearch.js
import { useQuery } from "@tanstack/react-query";
import { searchSessions } from "../api/search.api";
import { useDebounce } from "@/shared/hooks/useDebounce";

export function useSearch(query) {
  const debouncedQuery = useDebounce(query, 300); // 300ms de délai

  const { data, isLoading, error } = useQuery({
    queryKey: ["searchSessions", debouncedQuery],
    queryFn: () => searchSessions(debouncedQuery),
    enabled: !!debouncedQuery, // évite les appels vides
  });

  return {
    results: data?.data || [],
    isLoading,
    error,
  };
}
