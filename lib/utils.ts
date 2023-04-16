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

export const generateStringAndNumber = (
  myString: string,
  myNumber: number,
  maxLength: number
): string => {
  // check if the combined string length is greater than 15
  let MyDuplicateString: string = myString.slice();
  if (myString.length + myNumber.toString().length > maxLength) {
    // if it is, trim the name to make room for the random number
    const nameLength = maxLength - myNumber.toString().length;
    MyDuplicateString = myString.slice(0, nameLength);
  }

  return `${MyDuplicateString}${myNumber}`;
};

export const capitalizeFirstChar = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
