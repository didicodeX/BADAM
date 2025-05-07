import { api } from "@/shared/lib/axios";

export const getAllSessions = () =>{
    return api.get("/sessions");
}

export const getFavorites = () =>{
    return api.get("/wishlist");
}

export const addFavorite = (sessionId) => {
    return api.post(`/wishlist/${sessionId}`);
}

export const removeFavorite = (sessionId) => {
    return api.delete(`/wishlist/${sessionId}`);
}
