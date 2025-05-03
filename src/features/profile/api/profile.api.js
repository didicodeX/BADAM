import { api } from "@/shared/lib/axios";

export const updateUser = (payload) => {
  return api.patch("/users", payload);
};

export const deleteUser = () => {
  return api.delete("/users");
};
