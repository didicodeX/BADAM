import {  useQuery } from "@tanstack/react-query";
import * as LandingAPI from "../api/landing.api";

export default function useLanding() {

  const allSessionsQuery = useQuery({
    queryKey: ["all-sessions"],
    queryFn: LandingAPI.getAllSessions,
  });

  return {
    allSessions: allSessionsQuery.data?.data || [],
    isLoadingAllSessions: allSessionsQuery.isLoading,
  };
}