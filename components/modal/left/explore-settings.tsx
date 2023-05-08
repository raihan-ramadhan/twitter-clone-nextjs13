import { useModal } from "@/lib/hooks/useModal";
import { Modal } from "../modal";
import useModalVariant from "@/lib/hooks/useModalVariant";
import { HeroIcon } from "@/components/ui/hero-icon";

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
        <div className="p-2 cursor-pointer" onClick={openModal}>
          <HeroIcon iconName="Cog8ToothIcon" className="w-5 h-5" />
        </div>
      </div>
    </>
  );
};
