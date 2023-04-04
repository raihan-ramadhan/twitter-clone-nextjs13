"use client";
import { Select } from "../form/select";
import { useEffect } from "react";
import { Paragraph } from "../form/paragaph";
import { TitleForm } from "../form/title-form";
import { ButtonHighlight } from "../form/buttons-form";
import { useFormBirthdate } from "@/lib/hooks/useFormBirthdate";

export const RequireDataModal = (): JSX.Element => {
  const {
    months,
    days,
    years,
    formData,
    setFormData,
    daysInMonth,
    handleChange,
  } = useFormBirthdate();

  useEffect(() => {
    // make correction date if date not exist when change month and year
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
  }, [formData.month, formData.year]);

  return (
    <div className="py-14 px-5 w-full max-w-md mx-auto flex flex-col relative h-[650px] xs:h-full top-1/2 -translate-y-1/2 justify-between">
      <div className="w-full space-y-6">
        <div className="flex flex-col">
          <TitleForm title={"What's your birth date"} />
          <Paragraph text={"This wont be public"} />
        </div>
        <div className="grid grid-cols-2 xs:grid-cols-3 gap-5 ">
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
            classSelect="col-span-full xs:col-span-1"
          />
        </div>
      </div>
      <ButtonHighlight text="Next" className="!py-3 !text-lg" />
    </div>
  );
};
