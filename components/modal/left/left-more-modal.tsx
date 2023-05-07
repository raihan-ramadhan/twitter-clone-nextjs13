import cn from "clsx";

import { Modal } from "../modal";
import { useWindow } from "@/lib/context/window-context";
import { CircleModal } from "./circle-modal";
import { DisplayModal } from "./display-modal";
import { KeyboardModal } from "./keyboard-modal";
import { ProfessionalModal } from "./professional-modal";
import { VerifiedOrgsModal } from "./verifiedOrgs-modals";

import useModalVariant from "@/lib/hooks/useModalVariant";

import type { ModalLeftMore } from "@/components/left/left-more";
type LeftMoreModalProps = {
  currentModal: ModalLeftMore;
  handleCloseModal: () => void;
  open: boolean;
};

export type LeftMoreModalContent = { closeModal: () => void };

export const LeftMoreModal = ({
  currentModal,
  handleCloseModal,
  open,
}: LeftMoreModalProps): JSX.Element => {
  const { isBigMobile } = useWindow();
  const variant = useModalVariant();

  function renderComponentBasedOnCase(caseValue: ModalLeftMore): JSX.Element {
    switch (caseValue) {
      case "circle":
        return <CircleModal closeModal={handleCloseModal} />;
      case "verifiedOrgs":
        return <VerifiedOrgsModal closeModal={handleCloseModal} />;
      case "professional":
        return <ProfessionalModal closeModal={handleCloseModal} />;
      case "display":
        return <DisplayModal closeModal={handleCloseModal} />;
      case "keyboard":
        return <KeyboardModal closeModal={handleCloseModal} />;
      default:
        return <div className="text-red-400">Invalid case value</div>;
    }
  }
  return (
    <Modal
      modalClassName={cn(
        "w-full bg-main-background-1 sm:rounded-2xl hover-animation overflow-hidden h-full sm:h-[unset] sm:max-h-[calc(100vh_-_100px)] sm:min-h-[650px]",
        currentModal === "keyboard" ? "sm:max-w-4xl" : "sm:max-w-xl"
      )}
      open={open}
      closeModal={handleCloseModal}
      className={cn("flex items-center justify-center", isBigMobile && "!p-0")}
      modalAnimation={variant}
    >
      <div className="overflow-y-auto h-[inherit] sm:h-[inherit] sm:max-h-[inherit] sm:min-h-[inherit] w-[inherit] relative">
        {renderComponentBasedOnCase(currentModal)}
      </div>
    </Modal>
  );
};
