"use client";
import { auth } from "@/lib/firebase/app";
import { useState } from "react";
import { useRequireData } from "@/lib/context/require-data-context";
import { ButtonHighlight } from "@/components/ui/form/buttons-form";
import { ComponentModalProps } from "./require-data-modal";
import { onAuthStateChanged } from "firebase/auth";
import { updateUserCustomizeExperience } from "@/lib/firebase/utils";
import { SubTitleForm, TitleForm } from "@/components/ui/form/title-form";
import { Paragraph } from "@/components/ui/form/paragaph";

export const CustomizeExperienceModal = (
  props: ComponentModalProps
): JSX.Element => {
  const { nextSlide } = props;
  const { setError } = useRequireData();

  const [loading, setLoading] = useState<boolean>(false);
  const [customizeExperience, setCustomizeExperience] = useState<boolean>(true);

  const changeCustomizeExperience = () => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const uid = user.uid;
          setLoading(true);
          await updateUserCustomizeExperience(uid, customizeExperience);
          setLoading(false);
          await nextSlide();
        }
      } catch (error) {
        setError(true);
      }
    });
  };

  return (
    <div className="py-14 px-5 w-full max-w-md mx-auto flex flex-col relative min-h-[650px] xs:h-full top-1/2 -translate-y-1/2 justify-between space-y-3">
      <div className="w-full space-y-6">
        <TitleForm
          title={"Customize your experience"}
          className="py-0 text-3xl"
        />
        <div className="space-y-1">
          <SubTitleForm
            title={"Track where you see Twitter content across the web"}
            className="text-xl py-0"
          />
          <div className="flex gap-3">
            <Paragraph
              text={
                "Twitter uses this data to personalize your experience. This web browsing history will never be stored with your name, email, or phone number."
              }
              className="text-sm"
            />
            <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem] relative top-1">
              <input
                className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-accent-blue outline-none hover:cursor-pointer dark:border-accent-blue dark:checked:border-accent-blue dark:checked:bg-accent-blue
                checked:border-accent-blue checked:bg-accent-blue checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] 
                focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent "
                type="checkbox"
                id="checkboxNoLabel"
                onChange={() => {
                  setCustomizeExperience(!customizeExperience);
                }}
                checked={customizeExperience}
                aria-label="..."
              />
            </div>
          </div>
        </div>
        <p className="text-light-secondary dark:text-light-line-reply text-sm">
          Others will be able to find you by email or phone number, when
          provided, unless you choose otherwise{" "}
          <a
            href="https://help.twitter.com/en/safety-and-security/email-and-phone-discoverability-settings"
            target="_blank"
            className="span-link"
          >
            here
          </a>
          . For more details about these settings, visit the{" "}
          <a
            href="https://help.twitter.com/en"
            target="_blank"
            className="span-link"
          >
            Help Center
          </a>
          . Twitter may use your email address for purposes outlined in our
          Privacy Policy, like keeping your account secure and personalizing our
          services, including ads.{" "}
          <a
            href="https://twitter.com/en/privacy/previous/version_17"
            target="_blank"
            className="span-link"
          >
            Learn more
          </a>
        </p>
      </div>
      <ButtonHighlight
        loading={loading}
        disabled={!customizeExperience}
        callback={changeCustomizeExperience}
        text="Next"
        className="!py-3 !text-lg"
      />
    </div>
  );
};
