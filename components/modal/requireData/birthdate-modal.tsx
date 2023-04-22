"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/lib/firebase/app";
import { Select } from "../../ui/modal/select-modal";
import { TitleForm } from "../../ui/modal/title-modal";
import { CustomIcon } from "@/components/ui/custom-icons";
import { useRequireData } from "@/lib/context/require-data-context";
import { ParagraphModal } from "../../ui/modal/paragaph-modal";
import { ButtonHighlight } from "../../ui/modal/buttons-modal";
import { useFormBirthdate } from "@/lib/hooks/useFormBirthdate";
import { isBirtdateCorrect } from "@/lib/utils";
import { ComponentModalProps } from "./require-data-modal";
import { updateUserBirthdate } from "@/lib/firebase/utils";

export const BirthdateModal = (props: ComponentModalProps): JSX.Element => {
  const { nextSlide } = props;
  const {
    days,
    years,
    months,
    birthdate,
    daysInMonth,
    handleChange,
    setBirthdate,
  } = useFormBirthdate();
  const [loading, setLoading] = useState<boolean>(false);
  const { setError } = useRequireData();

  useEffect(() => {
    // make correction date if date not exist when change month and year
    const { date, month, year } = birthdate;
    const lastDaysInSelectedMonth = daysInMonth(month, year);
    // when initial value we given zero to all value so => daysInMonth(0, 0) === 31
    // because date=31 and lastDaysInSelectedMonth=0 so it's mean ignore bellow line
    if (date > lastDaysInSelectedMonth) {
      setBirthdate((prevFormData) => ({
        ...prevFormData,
        date: lastDaysInSelectedMonth,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [birthdate.month, birthdate.year]);

  const fillBirthdate = () => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const uid = user.uid;
          setLoading(true);
          await updateUserBirthdate(uid, birthdate);
          setLoading(false);
          await nextSlide();
        }
      } catch (error) {
        setError(true);
      }
    });
  };

  const isBirtdateNotInCorrect = !isBirtdateCorrect(birthdate);

  return (
    <>
      <CustomIcon
        className="w-8 h-8 text-accent-blue mx-auto absolute top-5 left-1/2 -translate-x-1/2 "
        iconName="TwitterIcon"
      />
      <div className="pt-[75px] h-full xs:min-h-[inherit] w-full flex flex-col">
        <div className="h-[calc(100%_-_100px)] xs:h-[475px] w-full relative z-0 space-y-6 px-5 xs:px-16">
          <div>
            <TitleForm title={"What's your birth date"} />
            <ParagraphModal text={"This wont be public"} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 ">
            <Select
              name="month"
              options={months}
              placeholder={"Month"}
              value={birthdate.month}
              handler={handleChange}
            />
            <Select
              name="date"
              options={days}
              placeholder={"Day"}
              value={birthdate.date}
              handler={handleChange}
            />
            <Select
              name="year"
              options={years}
              placeholder={"Year"}
              value={birthdate.year}
              handler={handleChange}
            />
          </div>
        </div>
        <div className="h-[100px] px-5 xs:px-16 flex items-center bg-main-background-1 xs:rounded-b-2xl">
          <ButtonHighlight
            disabled={isBirtdateNotInCorrect}
            loading={loading}
            callback={fillBirthdate}
            text="Next"
            className="py-3 text-lg"
          />
        </div>
      </div>
    </>
  );
};
