import { api } from "@/shared/lib/axios";

export const getMyRegistrations = () =>{
    return api.get("/registrations");
}

export const getCreatedSessions = () =>{
    return api.get("/sessions/me");
}