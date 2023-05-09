import cn from "clsx";
import { useEffect, useState } from "react";

import useModalVariant from "@/lib/hooks/useModalVariant";
import { Modal } from "../modal";
import { useAuth } from "@/lib/context/auth-context";
import { useModal } from "@/lib/hooks/useModal";
import { useWindow } from "@/lib/context/window-context";
import { SlideModal } from "./slide-modal";
import { useShowModal } from "@/lib/context/show-modal-context";
import { DisplayModal } from "./display-modal";
import { SignoutModal } from "../signout-modal";
import { KeyboardModal } from "./keyboard-modal";
import { TwitterBlueModal } from "./twitter-blue-modal";
import { VerifiedOrgsModal } from "./verifiedOrgs-modals";
import { ProfessionalModal } from "./professional-modal";

export type MobileLeftModals =
  | "twitterBlue"
  | "verifiedOrgs"
  | "display"
  | "professional"
  | "keyboard"
  | "logout"
  | null;

export type MobileNavLink = Omit<NavLink, "canBeHidden">;

export type MobileSidebarModalProps = Pick<
  User,
  "name" | "username" | "verified" | "photoURL" | "following" | "followers"
> & {
  handleCloseSlideLeft: () => void;
  handleOpenSlideLeft: () => void;
  openSlideLeft: boolean;
};

import type { NavLink } from "@/components/left/left";
import type { User } from "@/lib/types/user";

export function MobileLeftModal(props: MobileSidebarModalProps): JSX.Element {
  const { handleCloseSlideLeft, handleOpenSlideLeft, openSlideLeft } = props;
  const { setShowModal } = useShowModal();

  const { closeModal, openModal, open } = useModal();
  const { isBigMobile, isMobile } = useWindow();
  const { signOut } = useAuth();

  const [currentModal, setCurrentModal] = useState<MobileLeftModals>(null);
  const variant = useModalVariant();

  useEffect(() => {
    if (!isMobile && openSlideLeft) handleCloseSlideLeft();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const handleOpenModal = (modalName: MobileLeftModals) => {
    setShowModal(true);
    handleCloseSlideLeft();
    setCurrentModal(modalName);
    openModal();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    closeModal();
    setCurrentModal(null);
  };

  const handleSignout = async () => {
    signOut();
    handleCloseModal();
  };

  function renderBasedOnCurrentModal(caseValue: MobileLeftModals): JSX.Element {
    switch (caseValue) {
      case "twitterBlue":
        return <TwitterBlueModal closeModal={handleCloseModal} />;
      case "verifiedOrgs":
        return <VerifiedOrgsModal closeModal={handleCloseModal} />;
      case "professional":
        return <ProfessionalModal closeModal={handleCloseModal} />;
      case "display":
        return <DisplayModal closeModal={closeModal} />;
      case "keyboard":
        return <KeyboardModal closeModal={handleCloseModal} />;
      case "logout":
        return (
          <SignoutModal signOut={handleSignout} closeModal={handleCloseModal} />
        );
      default:
        return <></>;
    }
  }

  const modalClassNames: string[] = [
    "bg-main-background-1 w-full sm:max-w-xl sm:rounded-2xl hover-animation h-full sm:h-[unset] sm:min-h-[650px] relative flex justify-center items-center",
    "bg-main-background-1 w-full max-w-xs p-8 rounded-2xl hover-animation",
    "w-full bg-main-background-1 sm:rounded-2xl hover-animation overflow-hidden h-full sm:h-[unset] sm:max-h-[calc(100vh_-_100px)] sm:min-h-[650px] sm:max-w-xl",
  ];

  const [twitterBlueClass, logoutClass, restClass] = modalClassNames;
  return (
    <>
      <SlideModal
        {...props}
        {...{
          ...handleCloseSlideLeft,
          handleOpenSlideLeft,
          openSlideLeft,
          handleOpenModal,
        }}
      />
      <Modal
        modalClassName={cn(
          currentModal == "twitterBlue" && twitterBlueClass,
          currentModal == "logout" && logoutClass,
          currentModal !== "twitterBlue" &&
            currentModal !== "logout" &&
            restClass
        )}
        className={cn(
          "flex items-center justify-center",
          isBigMobile && "!p-0"
        )}
        backdropClassName={
          currentModal == "logout"
            ? "bg-main-background-1 brightness-75"
            : undefined
        }
        open={open}
        closeModal={handleCloseModal}
        modalAnimation={variant}
      >
        {currentModal == "verifiedOrgs" ? (
          <div className="overflow-y-auto h-[inherit] sm:h-[inherit] sm:max-h-[inherit] sm:min-h-[inherit] w-[inherit] relative">
            {renderBasedOnCurrentModal(currentModal)}
          </div>
        ) : (
          renderBasedOnCurrentModal(currentModal)
        )}
      </Modal>
    </>
  );
}
