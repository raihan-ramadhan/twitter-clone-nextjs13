"use client";
import { useAuth } from "@/lib/context/auth-context";
import { useModal } from "@/lib/hooks/useModal";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user/user-avatar";
import type { User } from "@/lib/types/user";
import { MobileLeftModal } from "../modal/left/mobile-left-modal";

export function MobileLeft(): JSX.Element | null {
  const { user } = useAuth();
  const {
    open: openSlideLeft,
    openModal: handleOpenSlideLeft,
    closeModal: handleCloseSlideLeft,
  } = useModal();

  return user ? (
    <>
      <MobileLeftModal
        {...(user as User)}
        openSlideLeft={openSlideLeft}
        handleOpenSlideLeft={handleOpenSlideLeft}
        handleCloseSlideLeft={handleCloseSlideLeft}
      />
      <Button
        className="accent-tab p-0 xs:hidden"
        onClick={handleOpenSlideLeft}
      >
        <UserAvatar src={user.photoURL} alt={user.name} size={30} />
      </Button>
    </>
  ) : null;
}
