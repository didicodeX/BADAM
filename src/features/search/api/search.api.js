import { api } from "@/shared/lib/axios";

export const searchFormations = async (query) => {
  const res = await api.get(`/formations/search`, {
    params: { query },
  });
  return res.data; // ex: array of formations
};
