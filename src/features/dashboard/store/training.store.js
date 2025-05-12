import { create } from "zustand";

export const useTrainingStore = create((set) => ({
  training: null,
  setTraining: (training) => set({training})
}))