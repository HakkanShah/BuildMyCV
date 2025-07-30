import { initialCVData } from "@/lib/cv-data";
import { CVData } from "@/lib/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CVDataState {
  data: CVData;
  setData: (data: CVData) => void;
  resetData: () => void;
}

// A dummy storage object that does nothing.
// This is used on the server-side where window.localStorage is not available.
const dummyStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const useCVData = create<CVDataState>()(
  persist(
    (set) => ({
      data: initialCVData,
      setData: (data) => set({ data }),
      resetData: () => set({ data: initialCVData }),
    }),
    {
      name: "cv-data-storage",
      // This is the key change:
      // We check if `window` is defined. If it is, we're on the client and can use localStorage.
      // If not, we're on the server, and we use the dummy storage object.
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? window.localStorage : dummyStorage
      ),
    }
  )
);
