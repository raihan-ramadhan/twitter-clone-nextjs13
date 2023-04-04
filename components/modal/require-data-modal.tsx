"use client";
import { Select } from "../form/select";
import { Paragraph } from "../form/paragaph";
import { TitleForm } from "../form/title-form";
import { CustomIcon } from "../ui/custom-icons";
import { ButtonHighlight } from "../form/buttons-form";
import { useEffect, useState } from "react";

import type { ChangeEvent } from "react";
import type { Birthdate } from "@/lib/types/user";

export type Month = {
  name: string;
  value: number;
};

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

export const RequireDataModal = (): JSX.Element => {
  const [formData, setFormData] = useState<Birthdate>({
    month: 0,
    date: 0,
    year: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: parseInt(value, 10),
    }));
  };

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getDaysOptions = () => {
    const { month, year } = formData;
    const daysInSelectedMonth = daysInMonth(month, year);
    const options = [] as number[];

    if (month === 0) return options;

    for (let i = 1; i <= daysInSelectedMonth; i++) {
      options.push(i);
    }
    return options;
  };
  const days: number[] = getDaysOptions();

  const years: number[] = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear - 100; i <= currentYear; i++) {
    years.unshift(i);
  }

  useEffect(() => {
    // make correction date if date not exist when change month
    const { date, month, year } = formData;
    const lastDaysInSelectedMonth = daysInMonth(month, year);
    // when initial value we given zero to all value so => daysInMonth(0, 0) === 31
    // because date=31 and lastDaysInSelectedMonth=0 so it's mean ignore bellow line
    if (date > lastDaysInSelectedMonth) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        date: lastDaysInSelectedMonth,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.month]);

  return (
    <div className="py-14 w-full max-w-md mx-auto flex flex-col relative h-full justify-between">
      <CustomIcon
        className="w-8 h-8 text-accent-blue mx-auto absolute top-3 left-1/2 -translate-x-1/2 "
        iconName="TwitterIcon"
      />
      <div className="w-full space-y-6">
        <div className="flex flex-col">
          <TitleForm title={"What's your birth date"} />
          <Paragraph text={"This wont be public"} />
        </div>
        <div className="flex w-full gap-5">
          <Select
            name="month"
            options={months}
            placeholder={"Month"}
            value={formData.month}
            handler={handleChange}
          />
          <Select
            name="date"
            options={days}
            placeholder={"Day"}
            value={formData.date}
            handler={handleChange}
          />
          <Select
            name="year"
            options={years}
            placeholder={"Year"}
            value={formData.year}
            handler={handleChange}
          />
        </div>
      </div>
      <ButtonHighlight text="Next" className="!py-3 !text-lg" />
    </div>
  );
};
