import { ChangeEvent } from "react";

export interface PropsSelect {
  name: string;
  options: Month[] | number[];
  value: number;
  placeholder: string;
  classSelect?: string;
  handler: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export type Month = {
  name: string;
  value: number;
};
