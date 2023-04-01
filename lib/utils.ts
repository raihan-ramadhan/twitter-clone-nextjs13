import type { SyntheticEvent } from "react";

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
