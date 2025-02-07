/* eslint-disable @typescript-eslint/no-explicit-any */
export const areObjectsEqual = (
  obj1: Record<string, any>,
  obj2: Record<string, any>
) => JSON.stringify(obj1) === JSON.stringify(obj2);
