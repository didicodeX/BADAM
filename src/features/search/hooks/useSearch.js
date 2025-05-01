import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import * as SearchAPI from "@/features/search/api/search.api"

export default function useSearchPage(){
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const queryResult = useQuery({
    queryKey:["search",query],
    queryFn:() => SearchAPI.searchFormations(query),
    enabled: !!query.trim(), // ne lance pas la requete si vide
  });

  return {
    ...queryResult,
    query
  }
}