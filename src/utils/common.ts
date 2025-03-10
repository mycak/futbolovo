import { AddEventInputs } from '@/schemas/addEventSchema';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const areObjectsEqual = (
  obj1: Record<string, any>,
  obj2: Record<string, any>
) => JSON.stringify(obj1) === JSON.stringify(obj2);

export const parseOldToCurrentEventData = (
  data: AddEventInputs
): AddEventInputs => {
  const isOldPrice = !!data?.price;

  if (isOldPrice) {
    return {
      ...data,
      priceFrom: data.price as number,
      priceTo: data.price as number,
      price: undefined,
    };
  } else {
    return data;
  }
};
