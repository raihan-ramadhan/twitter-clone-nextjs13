import type { SyntheticEvent } from "react";
import type { Birthdate } from "./types/user";

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function preventBubbling(
  callback?: ((...args: never[]) => unknown) | null,
  noPreventDefault?: boolean
) {
  return (e: SyntheticEvent): void => {
    e.stopPropagation();

    if (!noPreventDefault) e.preventDefault();
    if (callback) callback();
  };
}

export const isBirtdateCorrect = (userBirtDate: Birthdate): boolean => {
  const { month, date, year } = userBirtDate;
  return !(month === 0 || date === 0 || year === 0);
};
