import cn from "clsx";

import { Modal } from "../modal/modal";
import { ToolTip } from "../ui/tooltip";
import { useModal } from "@/lib/hooks/useModal";
import { useWindow } from "@/lib/context/window-context";
import { CustomIcon } from "../ui/custom-icons";
import { useShowModal } from "@/lib/context/show-modal-context";
import { TwitterBlueModal } from "../modal/left/twitter-blue-modal";
import useModalVariant from "@/lib/hooks/useModalVariant";

export const LeftTwitterBlue = (): JSX.Element => {
  const { isBigMobile, height: windowHeight } = useWindow();
  const { setShowModal } = useShowModal();

  const variant = useModalVariant();
  const { open, openModal, closeModal } = useModal();

  const handleOpen = () => {
    setShowModal(true);
    openModal();
  };

  const handleClose = () => {
    setShowModal(false);
    closeModal();
  };

  return (
    <>
      <Modal
        modalClassName="bg-main-background-1 w-full sm:max-w-xl sm:rounded-2xl hover-animation h-full sm:h-[unset] sm:min-h-[650px] relative flex justify-center items-center"
        className={cn(
          "flex items-center justify-center",
          isBigMobile && "!p-0"
        )}
        open={open}
        closeModal={handleClose}
        modalAnimation={variant}
      >
        <TwitterBlueModal closeModal={handleClose} />
      </Modal>
      <button
        className={cn(
          "group flex-1 outline-none w-full justify-center xl:justify-start hidden xs:flex",
          windowHeight > 700 && "py-1"
        )}
        type="button"
        onClick={handleOpen}
      >
        <div className="flex items-center gap-5 custom-button xl:pr-6 group-hover:bg-light-primary/10 group-focus-visible:ring-2 group-focus-visible:ring-[#878a8c] dark:group-hover:bg-dark-primary/10 dark:group-focus-visible:ring-white justify-center">
          <ToolTip
            tip="Twitter Blue"
            className="inline xl:hidden translate-y-[200%] !opacity-75 group-hover:z-50"
          />
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
