"use client";
import { auth } from "@/lib/firebase/app";
import { Select } from "../../ui/modal/select-modal";
import { useState } from "react";
import { ParagraphModal } from "../../ui/modal/paragaph-modal";
import { useEffect } from "react";
import { TitleForm } from "../../ui/modal/title-modal";
import { CustomIcon } from "@/components/ui/custom-icons";
import { useRequireData } from "@/lib/context/require-data-context";
import { ButtonHighlight } from "../../ui/modal/buttons-modal";
import { useFormBirthdate } from "@/lib/hooks/useFormBirthdate";
import { onAuthStateChanged } from "firebase/auth";
import { ComponentModalProps } from "./require-data-modal";
import { updateUserBirthdate } from "@/lib/firebase/utils";
import { isBirtdateCorrect } from "@/lib/utils";

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
      <div className="py-14 px-5 xs:px-14 w-full min-h-[624px] flex flex-col justify-between gap-3">
        <div className="w-full space-y-6">
          <div className="flex flex-col">
            <TitleForm title={"What's your birth date"} />
            <ParagraphModal text={"This wont be public"} />
          </div>
          <div className="grid grid-cols-2 xs:grid-cols-3 gap-5 ">
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
              classSelect="col-span-full xs:col-span-1"
            />
          </div>
        </div>
        <ButtonHighlight
          disabled={isBirtdateNotInCorrect}
          loading={loading}
          callback={fillBirthdate}
          text="Next"
          className="py-3 text-lg"
        />
      </div>
    </>
  );
};
