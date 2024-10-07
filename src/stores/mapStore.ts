import { create } from "zustand";

export interface MapState {
  mapZoom: number;
  center: {
    lat: number;
    lng: number;
  } | null;
}
export interface MapAction {
  setCenter: (coords: { lat: number; lng: number }) => void;
  setZoom: (mapZoom: number) => void;
  clearState: () => void;
}

const initialState: MapState = {
  mapZoom: 10,
  center: null,
};

export const useMapStore = create<MapState & MapAction>((set) => ({
  ...initialState,
  setCenter: (center) => set({ center }),
  setZoom: (mapZoom) => set({ mapZoom }),
  clearState: () => set({ ...initialState }),
}));
