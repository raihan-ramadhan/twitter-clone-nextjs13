import { ChangeEvent } from "react";
import { mainRequireData, secondaryRequireData } from "../data/requireData";

export interface PropsSelect {
  name: string;
  options: Month[] | number[];
  value: number;
  placeholder: string;
  classSelect?: string;
  handler: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export type Month = { name: string; value: number };

export type MainRequireData = typeof mainRequireData[number];

export type SecondaryRequireData = typeof secondaryRequireData[number];

export type RequireData = (MainRequireData | SecondaryRequireData)[] | null;
