import { AddEventInputs } from './../schemas/addEventSchema';
import { create } from 'zustand';
import { clearImageFilenameStorage } from '@/utils/sessionStorage';

export interface AddEventState {
  addData: (AddEventInputs & { id?: string }) | undefined;
  tempAddData: AddEventInputs | undefined;
  currentStep: number;
}

export interface AddEventAction {
  setAddData: (addData: AddEventInputs & { id?: string }) => void;
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
    clearState: () => {
      // Clear form state
      set((state) => ({ ...initialState, tempAddData: state.tempAddData }));

      // Clear image filename storage when starting fresh
      clearImageFilenameStorage();
    },
    clearTempData: () => set((state) => ({ ...state, tempAddData: undefined })),
  })
);
