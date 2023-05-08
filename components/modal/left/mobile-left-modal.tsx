import { MainHeader } from "@/components/main/main-header";
import type { NavLink } from "@/components/left/left";
import type { User } from "@/lib/types/user";

export type MobileNavLink = Omit<NavLink, "canBeHidden">;

type MobileSidebarModalProps = Pick<
  User,
  | "name"
  | "username"
  | "verified"
  | "photoURL"
  | "following"
  | "followers"
  | "coverPhotoURL"
> & {
  closeModal: () => void;
};

export function MobileLeftModal({
  name,
  username,
  verified,
  photoURL,
  following,
  followers,
  coverPhotoURL,
  closeModal,
}: MobileSidebarModalProps): JSX.Element {
  return (
    <>
      <MainHeader
        useActionButton
        className="flex flex-row-reverse justify-between "
        titleClassName="text-base xs:text-xl"
        iconName="XMarkIcon"
        title="Account info"
        tip="Close"
        action={closeModal}
      />
    </>
  );
}
