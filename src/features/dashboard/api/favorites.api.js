import { api } from "@/shared/lib/axios";

export const getFavorites = () => {
    return api.get("/wishlist");
}

export const addFavorite = (sessionId) => {
    return api.post(`/wishlist/${sessionId}`);
}

export const removeFavorite = (sessionId) => {
    return api.delete(`/wishlist/${sessionId}`);
}


// ## Whislist

// - POST URL/wishlist/:sessionId
// - GET URL/wishlist
// - DELETE URL/wishlist/:sessionId