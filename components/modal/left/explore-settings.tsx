import { Modal } from "../modal";
import { Button } from "@/components/ui/button";
import { HeroIcon } from "@/components/ui/hero-icon";
import { useModal } from "@/lib/hooks/useModal";
import useModalVariant from "@/lib/hooks/useModalVariant";

export const ExploreSettingsModal = () => {
  const { open, closeModal, openModal } = useModal();
  const variant = useModalVariant();

  return (
    <>
      <Modal
        className="items-center justify-center xs:flex"
        modalClassName="max-w-xl w-full bg-main-background-1"
        open={open}
        closeModal={closeModal}
        modalAnimation={variant}
      >
        ExploreSettingsModal
      </Modal>
      <div className="pl-5">
        <Button
          className="p-2 cursor-pointer hover:bg-light-primary/10 active:bg-light-primary/20 dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20"
          onClick={openModal}
        >
          <HeroIcon iconName="Cog8ToothIcon" className="w-5 h-5" />
        </Button>
      </div>
    </>
  );
};
