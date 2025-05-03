import { api } from "@/shared/lib/axios";

export const getWishlist = () => {
    return api.get("/wishlist");
}