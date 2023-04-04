import type { SyntheticEvent } from "react";
import type { User } from "./types/user";

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

export const isBirtdateCorrect = (userBirtDate: User): boolean => {
  const { birthdate } = userBirtDate;
  const { month, date, year } = birthdate;
  return !(month === 0 || date === 0 || year === 0);
};
