"use client";
import { useState } from "react";
import type { Month } from "@/lib/types/requireData";
import type { Birthdate } from "../types/user";
import type { ChangeEvent } from "react";

type formBirthdate = {
  days: number[];
  years: number[];
  months: Month[];
  birthdate: Birthdate;
  daysInMonth: (month: number, year: number) => number;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  setBirthdate: React.Dispatch<React.SetStateAction<Birthdate>>;
};

export const useFormBirthdate = (): formBirthdate => {
  const [birthdate, setBirthdate] = useState<Birthdate>({
    month: 0,
    date: 0,
    year: 0,
  });
  const months: Month[] = [
    { name: "january", value: 1 },
    { name: "february", value: 2 },
    { name: "march", value: 3 },
    { name: "april", value: 4 },
    { name: "may", value: 5 },
    { name: "june", value: 6 },
    { name: "july", value: 7 },
    { name: "august", value: 8 },
    { name: "september", value: 9 },
    { name: "october", value: 10 },
    { name: "november", value: 11 },
    { name: "december", value: 12 },
  ];

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getDaysOptions = (birthdate: Birthdate) => {
    const { month, year } = birthdate;
    const daysInSelectedMonth = daysInMonth(month, year);
    const options = [] as number[];

    if (month === 0) return options;

    for (let i = 1; i <= daysInSelectedMonth; i++) options.push(i);

    return options;
  };

  const days: number[] = getDaysOptions(birthdate);

  const years: number[] = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear - 100; i <= currentYear; i++) years.unshift(i);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBirthdate((prevFormData) => ({
      ...prevFormData,
      [name]: parseInt(value, 10),
    }));
  };

  return {
    days,
    years,
    months,
    birthdate,
    daysInMonth,
    handleChange,
    setBirthdate,
  };
};
