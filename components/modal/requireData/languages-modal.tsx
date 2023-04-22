import cn from "clsx";
import { auth } from "@/lib/firebase/app";
import { useState } from "react";
import { TitleForm } from "@/components/ui/modal/title-modal";
import { languages } from "@/lib/data/user";
import { CustomIcon } from "@/components/ui/custom-icons";
import { InputCheckbox } from "@/components/ui/input";
import { useRequireData } from "@/lib/context/require-data-context";
import { ParagraphModal } from "@/components/ui/modal/paragaph-modal";
import { ButtonHighlight } from "@/components/ui/modal/buttons-modal";
import { onAuthStateChanged } from "firebase/auth";
import { updateUserLanguages } from "@/lib/firebase/utils";

import type { Languages } from "@/lib/types/user";
import type { ComponentModalProps } from "./require-data-modal";
import { useWindow } from "@/lib/context/window-context";

export const LanguagesModal = (props: ComponentModalProps): JSX.Element => {
  const { nextSlide } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [showLanguages, setShowLanguages] = useState<boolean>(true);
  const [languagesChecked, setLanguagesChecked] = useState<Languages[]>([]);
  const { setError } = useRequireData();

  const handleToggleClick = () => {
    setShowLanguages(!showLanguages);
  };

  const fillLanguages = async (): Promise<void> => {
    if (languagesChecked.length !== 0) {
      onAuthStateChanged(auth, async (user) => {
        try {
          if (user) {
            const uid = user.uid;
            setLoading(true);
            await updateUserLanguages(uid, languagesChecked);
            setLoading(false);
            await nextSlide();
          }
        } catch (error) {
          setError(true);
        }
      });
    } else {
      await nextSlide();
    }
  };

  const handleInputCheckboxChange = (
    languageInput: Languages,
    checked: boolean
  ) => {
    if (checked) {
      setLanguagesChecked([...languagesChecked, languageInput]);
    } else {
      setLanguagesChecked(
        languagesChecked.filter((language) => language !== languageInput)
      );
    }
  };

  const displayedLanguages = showLanguages
    ? languages.slice(0, 3)
    : languages.slice();

  return (
    <>
      <CustomIcon
        className="w-8 h-8 text-accent-blue mx-auto absolute top-5 left-1/2 -translate-x-1/2 "
        iconName="TwitterIcon"
      />
      <div className="pt-[75px] h-full xs:min-h-[inherit] w-full flex flex-col">
        <div className="h-[calc(100%_-_100px)] xs:h-[475px] w-full relative z-0 space-y-3 px-5 xs:px-16 overflow-hidden flex flex-col">
          <div>
            <TitleForm title={"Which languages do you speak?"} />
            <ParagraphModal
              className="text-base"
              text={
                "You'll be able to see Tweets, people, and trends in any languages you choose"
              }
            />
          </div>
          <div
            className={cn(
              "h-[150px] overflow-y-auto scrollbar-w-1 scrollbar-thumb-accent-blue scrollbar-track-main-background-3 scrollbar-thin",
              !showLanguages && "pr-3 flex-1"
            )}
          >
            {displayedLanguages.map((language, index) => (
              <label
                key={index}
                className="border-b flex justify-between items-center w-full h-[50px] text-lg cursor-pointer text-light-secondary dark:text-light-line-reply overflow-x-visible pr-2 group"
              >
                <span>{language}</span>
                <InputCheckbox
                  checked={languagesChecked.includes(language)}
                  onChange={(event) => {
                    handleInputCheckboxChange(language, event.target.checked);
                  }}
                  beforeClassName="scale-[1.75] group-hover:bg-dark-line-reply/10 peer-focus:bg-dark-line-reply/10 dark:group-hover:bg-accent-blue/5 dark:peer-focus:bg-accent-blue/5 peer-checked:bg-transparent"
                />
              </label>
            ))}
          </div>
          <div
            onClick={handleToggleClick}
            className="bg-accent-blue/[0.01] hover:bg-accent-blue/[0.05] hover-animation cursor-pointer h-[50px] flex justify-center items-center"
          >
            <button type="button" className="text-accent-blue font-semibold ">
              {showLanguages ? "Show more" : "Hide"}
            </button>
          </div>
        </div>
        <div className="h-[100px] px-5 xs:px-16 flex items-center bg-main-background-1 xs:rounded-b-2xl">
          <ButtonHighlight
            loading={loading}
            callback={fillLanguages}
            text="Next"
            className="py-3 text-lg"
          />
        </div>
      </div>
    </>
  );
};
