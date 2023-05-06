"use client";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/lib/firebase/app";
import { CustomIcon } from "@/components/ui/custom-icons";
import { useRequireData } from "@/lib/context/require-data-context";
import { ParagraphModal } from "@/components/ui/modal/paragaph-modal";
import { ButtonHighlight } from "@/components/ui/modal/buttons-modal";
import { ComponentModalProps } from "./require-data-modal";
import { SubTitleModal, TitleModal } from "@/components/ui/modal/title-modal";

export const ListsModal = (props: ComponentModalProps) => {
  const { nextSlide } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const { setError } = useRequireData();

  const fillLists = () => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const uid = user.uid;
          setLoading(true);
          // await updateUserLists(uid, birthdate);
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
        <div className="h-full max-h-[calc(100%_-_100px)] xs:h-[475px] overflow-y-auto px-5 xs:px-16 scrollbar-w-1 scrollbar-thumb-accent-blue hover:scrollbar-thumb-accent-blue/80 scrollbar-track-main-background-3 scrollbar-thin">
          <TitleModal title={"What do you want to see in Twitter?"} />
          <ParagraphModal
            text={
              "By following a lists, you will see tweets from that lists in a separate timeline."
            }
            className="text-base"
          />
          <SubTitleModal
            className="text-xl p-2"
            title="Follow 1 or more accounts"
          />
          <div className="flex flex-col gap-5">
            <div className="bg-main-background-3 p-2">
              <p className="font-semibold">COMING SOON</p>
            </div>
          </div>
        </div>
        <div className="h-[100px] px-5 xs:px-16 bg-main-background-1 xs:rounded-b-2xl flex items-center">
          <ButtonHighlight
            callback={fillLists}
            loading={loading}
            text="Next"
            className="text-lg p-2"
          />
        </div>
      </div>
    </>
  );
};
