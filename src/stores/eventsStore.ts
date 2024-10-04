import { Events, MapFilters } from "@/types/common";
import { create } from "zustand";

export interface EventsState {
  events: Events;
  filters: MapFilters;
}
export interface EventsAction {
  setEvents: (events: Events) => void;
  setFilters: (filters: MapFilters) => void;
  clearState: () => void;
}

const initialState: EventsState = {
  events: [],
  filters: {
    categories: undefined,
    coords: undefined,
    search: undefined,
    dateRange: undefined,
  },
};

export const useEventsStore = create<EventsState & EventsAction>((set) => ({
  ...initialState,
  setEvents: (events) => set({ events }),
  setFilters: (filters) => set({ filters }),
  clearState: () => set({ ...initialState }),
}));