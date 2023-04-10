import {
  ButtonHighlight,
  ButtonSecondary,
} from "@/components/ui/modal/buttons-modal";
import { ParagraphModal } from "@/components/ui/modal/paragaph-modal";
import { TitleForm } from "@/components/ui/modal/title-modal";
import { HeroIcon } from "@/components/ui/hero-icon";

export const NotificationsModal = () => {
  return (
    <>
      <div className="py-14 px-10 xs:px-20 w-full">
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
            <ButtonHighlight text="Allow notifications" className="py-3" />
            <ButtonSecondary text="Skip for now" className="py-3" />
          </div>
        </div>
      </div>
    </>
  );
};
