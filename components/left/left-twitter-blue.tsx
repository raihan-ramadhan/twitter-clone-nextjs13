import cn from "clsx";

import { Modal } from "../modal/modal";
import { useModal } from "@/lib/hooks/useModal";
import { useWindow } from "@/lib/context/window-context";
import { CustomIcon } from "../ui/custom-icons";
import { useShowModal } from "@/lib/context/show-modal-context";
import { TwitterBlueModal } from "../modal/twitter-blue-modal";

import type { Variants } from "framer-motion";

export const LeftTwitterBlue = (): JSX.Element => {
  const { isMobile } = useWindow();
  const { setShowModal } = useShowModal();
  const { open, openModal, closeModal } = useModal();

  const handleOpen = () => {
    setShowModal(true);
    openModal();
  };

  const handleClose = () => {
    setShowModal(false);
    closeModal();
  };

  const variants: Variants = isMobile
    ? {
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: { duration: 0.2 },
        },
        exit: { opacity: 0, transition: { duration: 0.15 } },
      }
    : {
        initial: { opacity: 0, scale: 0.8 },
        animate: {
          opacity: 1,
          scale: 1,
          transition: { type: "spring", duration: 0.5, bounce: 0.4 },
        },
        exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
      };

  return (
    <>
      <Modal
        modalClassName="bg-main-background-1 w-full xs:max-w-xl xs:rounded-2xl hover-animation h-full xs:h-[unset] xs:min-h-[650px] relative flex justify-center items-center"
        className={cn("flex items-center justify-center", isMobile && "!p-0")}
        open={open}
        closeModal={handleClose}
        modalAnimation={variants}
      >
        <TwitterBlueModal closeModal={handleClose} />
      </Modal>
      <button
        className="group flex-1 py-1 outline-none w-full justify-center xl:justify-start hidden xs:flex"
        type="button"
        onClick={handleOpen}
      >
        <div className="flex items-center gap-5 custom-button xl:pr-6 group-hover:bg-light-primary/10 group-focus-visible:ring-2 group-focus-visible:ring-[#878a8c] dark:group-hover:bg-dark-primary/10 dark:group-focus-visible:ring-white justify-center">
          <CustomIcon
            className="w-7 h-7"
            iconName="TwitterBlueIcon"
            solid={open}
          />
          <span className={cn("hidden xl:inline text-xl", open && "font-bold")}>
            Twitter Blue
          </span>
        </div>
      </button>
    </>
  );
};