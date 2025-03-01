import { Events, MapFilters } from '@/types/common';
import { addMonths } from 'date-fns';
import { create } from 'zustand';

export interface EventsState {
  events: Events;
  filters: MapFilters;
}
export interface EventsAction {
  setEvents: (events: Events) => void;
  setFilters: (filters: MapFilters) => void;
  clearState: () => void;
}

export const filtersInitialState = {
  categories: undefined,
  coords: undefined,
  search: '',
  startDate: new Date(),
  endDate: addMonths(new Date(), 6),
  ageCategories: undefined,
  female: undefined,
};

const initialState: EventsState = {
  events: [],
  filters: filtersInitialState,
};

export const useEventsStore = create<EventsState & EventsAction>((set) => ({
  ...initialState,
  setEvents: (events) => set({ events }),
  setFilters: (filters) => set({ filters }),
  clearState: () => set({ ...initialState }),
}));
