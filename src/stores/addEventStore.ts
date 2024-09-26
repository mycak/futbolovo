import { AddEventInputs } from "./../schemas/addEventSchema";
import { create } from "zustand";

export interface AddEventState {
  addData: AddEventInputs | undefined;
  currentStep: number;
}

export interface AddEventAction {
  setAddData: (addData: AddEventInputs) => void;
  setStep: (currentStep: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  clearState: () => void;
}

const initialState: AddEventState = {
  addData: undefined,
  currentStep: 0,
};

export const useAddEventStore = create<AddEventState & AddEventAction>(
  (set) => ({
    ...initialState,
    setAddData: (addData) => set({ addData }),
    nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
    prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
    setStep: (currentStep) => set({ currentStep }),
    clearState: () => set({ ...initialState }),
  })
);
