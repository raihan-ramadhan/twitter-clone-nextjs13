import cn from "clsx";

import { Modal } from "../modal";
import { useWindow } from "@/lib/context/window-context";
import { CircleModal } from "./circle-modal";
import { DisplayModal } from "./display-modal";
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
  const { isMobile } = useWindow();
  const variant = useModalVariant();

  function renderComponentBasedOnCase(caseValue: ModalLeftMore): JSX.Element {
    switch (caseValue) {
      case "display":
        return <DisplayModal closeModal={handleCloseModal} />;
      case "professional":
        return <div>Twitter for Professional Coming Soon</div>;
      case "circle":
        return <CircleModal closeModal={handleCloseModal} />;
      case "keyboard":
        return <div>Keyboard Shortcut Coming Soon</div>;
      case "verifiedOrgs":
        return <VerifiedOrgsModal closeModal={handleCloseModal} />;
      default:
        return <div className="text-red-400">Invalid case value</div>;
    }
  }
  return (
    <Modal
      modalClassName="w-full max-w-xl bg-main-background-1 xs:rounded-2xl hover-animation overflow-hidden h-full xs:h-[unset] xs:max-h-[calc(100vh_-_100px)] xs:min-h-[650px]"
      open={open}
      closeModal={handleCloseModal}
      className={cn("flex items-center justify-center", isMobile && "!p-0")}
      modalAnimation={variant}
    >
      <div className="overflow-y-auto h-[inherit] xs:h-[inherit] xs:max-h-[inherit] xs:min-h-[inherit] w-[inherit]">
        {renderComponentBasedOnCase(currentModal)}
      </div>
    </Modal>
  );
};
