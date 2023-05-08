"use client";
import { useAuth } from "@/lib/context/auth-context";
import { useModal } from "@/lib/hooks/useModal";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modal/modal";
import { UserAvatar } from "@/components/user/user-avatar";
import type { Variants } from "framer-motion";
import type { User } from "@/lib/types/user";
import { MobileLeftModal } from "../modal/left/mobile-left-modal";

const variant: Variants = {
  initial: { x: "-100%", opacity: 0.8 },
  animate: {
    x: -8,
    opacity: 1,
    transition: { type: "spring", duration: 0.8 },
  },
  exit: { x: "-100%", opacity: 0.8, transition: { duration: 0.4 } },
};

export function MobileLeft(): JSX.Element {
  const { user } = useAuth();
  const { photoURL, name } = user as User;
  const { open, openModal, closeModal } = useModal();

  return (
    <>
      <Modal
        className="!p-0"
        modalAnimation={variant}
        modalClassName="pb-4 pl-2 h-screen overflow-y-auto w-72 bg-main-background-1"
        open={open}
        closeModal={closeModal}
      >
        <MobileLeftModal {...(user as User)} closeModal={closeModal} />
      </Modal>
      <Button className="accent-tab p-0 xs:hidden" onClick={openModal}>
        <UserAvatar src={photoURL} alt={name} size={30} />
      </Button>
    </>
  );
}
