import { AddEventInputs } from './../schemas/addEventSchema';
import { create } from 'zustand';

export interface AddEventState {
  addData: AddEventInputs | undefined;
  tempAddData: AddEventInputs | undefined;
  currentStep: number;
}

export interface AddEventAction {
  setAddData: (addData: AddEventInputs) => void;
  setTempAddData: (tempData: AddEventInputs) => void;
  setStep: (currentStep: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  clearState: () => void;
  clearTempData: () => void;
}

const initialState: AddEventState = {
  addData: undefined,
  tempAddData: undefined,
  currentStep: 0,
};

export const useAddEventWizardStore = create<AddEventState & AddEventAction>(
  (set) => ({
    ...initialState,
    setAddData: (addData) => set({ addData }),
    setTempAddData: (tempAddData) => set({ tempAddData }),

    nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
    prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),

    setStep: (currentStep) => set({ currentStep }),
    clearState: () =>
      set((state) => ({ ...initialState, tempAddData: state.tempAddData })),
    clearTempData: () => set((state) => ({ ...state, tempAddData: undefined })),
  })
);
