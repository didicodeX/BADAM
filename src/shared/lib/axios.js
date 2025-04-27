// src/shared/lib/axios.ts
import axios from "axios";
import { API_URL } from "@/shared/config/env";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});


