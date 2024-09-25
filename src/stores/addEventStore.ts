import { AddEventInputs } from "./../schemas/addEventSchema";
import { create } from "zustand";

export interface AddEventState {
  addData: AddEventInputs | undefined;
}

export interface AddEventAction {
  setAddData: (addData: AddEventInputs) => void;
}

const initialState: AddEventState = {
  addData: undefined,
};

export const useAddEventStore = create<AddEventState & AddEventAction>(
  (set) => ({
    ...initialState,
    setAddData: (addData) => set({ addData }),
  })
);
