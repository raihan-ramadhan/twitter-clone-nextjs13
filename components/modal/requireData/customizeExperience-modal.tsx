"use client";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

import { auth } from "@/lib/firebase/app";
import { CustomIcon } from "@/components/ui/custom-icons";
import { InputCheckbox } from "@/components/ui/input";
import { ParagraphModal } from "@/components/ui/modal/paragaph-modal";
import { useRequireData } from "@/lib/context/require-data-context";
import { ButtonHighlight } from "@/components/ui/modal/buttons-modal";
import { ComponentModalProps } from "./require-data-modal";
import { SubTitleModal, TitleForm } from "@/components/ui/modal/title-modal";
import { updateUserCustomizeExperience } from "@/lib/firebase/utils";

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
    <>
      <CustomIcon
        className="w-8 h-8 text-accent-blue mx-auto absolute top-5 left-1/2 -translate-x-1/2 "
        iconName="TwitterIcon"
      />
      <div className="pt-[75px] h-full xs:min-h-[inherit] w-full flex flex-col">
        <div className="h-[calc(100%_-_100px)] xs:h-[475px] w-full relative z-0 space-y-6 px-5 xs:px-16">
          <TitleForm
            title={"Customize your experience"}
            className="py-0 text-3xl"
          />
          <div className="space-y-2">
            <SubTitleModal
              title={"Track where you see Twitter content across the web"}
              className="text-xl py-0"
            />
            <div className="flex gap-3">
              <ParagraphModal
                text={
                  "Twitter uses this data to personalize your experience. This web browsing history will never be stored with your name, email, or phone number."
                }
                className="text-sm flex-1"
              />
              <InputCheckbox
                checked={customizeExperience}
                onChange={() => setCustomizeExperience(!customizeExperience)}
              />
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
            Privacy Policy, like keeping your account secure and personalizing
            our services, including ads.{" "}
            <a
              href="https://twitter.com/en/privacy/previous/version_17"
              target="_blank"
              className="span-link"
            >
              Learn more
            </a>
          </p>
        </div>
        <div className="h-[100px] px-5 xs:px-16 flex items-center bg-main-background-1 xs:rounded-b-2xl">
          <ButtonHighlight
            loading={loading}
            disabled={!customizeExperience}
            callback={changeCustomizeExperience}
            text="Next"
            className="py-3 text-lg"
          />
        </div>
      </div>
    </>
  );
};
