import { round } from "lodash";
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

export const isTouchDevice = (): boolean => {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
};

export const numberToAbbreviation = (number: number): string => {
  const abbreviations = ["K", "M", "B", "T"];

  // Check if the number is within the range that needs abbreviation
  if (number >= 1000) {
    // Calculate the logarithm of the number with base 1000
    const logValue = Math.floor(Math.log10(number) / Math.log10(1000));

    // Get the abbreviation based on the logarithm value
    const abbreviation = abbreviations[logValue - 1];

    // Calculate the abbreviated value
    const abbreviatedNumber = number / Math.pow(1000, logValue);

    // Format the abbreviated number with up to 2 decimal places
    const formattedNumber = round(abbreviatedNumber, 2).toString();

    // Concatenate the abbreviated number and the abbreviation
    return `${formattedNumber}${abbreviation}`;
  }

  // Return the original number as a string if no abbreviation is needed
  return number.toString();
};
