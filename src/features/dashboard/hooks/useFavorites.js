import { useEffect } from "react";
import { getWishlist } from "../api/favorites.api";

export default function useFavorites() {
  useEffect(() => {
    async function fetchWishlist() {
      try {
        const response = await getWishlist();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchWishlist();
  });
}
