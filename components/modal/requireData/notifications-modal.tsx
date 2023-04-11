import { auth } from "@/lib/firebase/app";
import { useState } from "react";
import { HeroIcon } from "@/components/ui/hero-icon";
import { TitleForm } from "@/components/ui/modal/title-modal";
import { ParagraphModal } from "@/components/ui/modal/paragaph-modal";
import { useRequireData } from "@/lib/context/require-data-context";
import { onAuthStateChanged } from "firebase/auth";
import { updateUserNotifications } from "@/lib/firebase/utils";
import {
  ButtonHighlight,
  ButtonSecondary,
} from "@/components/ui/modal/buttons-modal";

import type { ComponentModalProps } from "./require-data-modal";

export const NotificationsModal = (props: ComponentModalProps): JSX.Element => {
  const { nextSlide } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const { setError } = useRequireData();

  const fillNotifications = () => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const uid = user.uid;
          setLoading(true);
          await updateUserNotifications(uid, true);
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
      <div className="py-14 px-7 xs:px-20 w-full">
        <div className="py-14 relative w-full flex flex-col items-center gap-6">
          <HeroIcon
            iconName="BellIcon"
            className="h-10 w-10 text-accent-blue absolute top-0 left-1/2 -translate-x-1/2"
          />
          <div>
            <TitleForm title="Turn on notifications" />
            <ParagraphModal
              text="Get the most out of the twitter by staying up to date with what's happening"
              className="text-base"
            />
          </div>
          <div className="space-y-4 w-full">
            <ButtonHighlight
              loading={loading}
              text="Allow notifications"
              className="py-3"
              callback={fillNotifications}
            />
            <ButtonSecondary
              loading={loading}
              text="Skip for now"
              className="py-3"
              callback={nextSlide}
            />
          </div>
        </div>
      </div>
    </>
  );
};
