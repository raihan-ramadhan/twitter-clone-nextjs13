import cn from "clsx";
import Link from "next/link";
import { Variants } from "framer-motion";

import { Modal } from "../modal";
import { HrLine } from "@/components/ui/hr-line";
import { HeroIcon } from "@/components/ui/hero-icon";
import { UserName } from "@/components/user/user-name";
import { MenuLink } from "@/components/left/menu-link";
import { UserAvatar } from "@/components/user/user-avatar";
import { CustomIcon } from "@/components/ui/custom-icons";
import { MainHeader } from "@/components/main/main-header";
import { UserUsername } from "@/components/user/user-username";
import { MobileLeftModals, MobileSidebarModalProps } from "./mobile-left-modal";

const leftToRightVariant: Variants = {
  initial: { x: "-100%" },
  animate: {
    x: -8,
    transition: { type: "spring", duration: 0.8 },
  },
  exit: { x: "-100%", transition: { duration: 0.4 } },
};

type Stats = [string, string, number];
type SlideModalProps = Omit<MobileSidebarModalProps, "handleOpenSlideLeft"> & {
  handleOpenModal: (prop: MobileLeftModals) => void;
};

export const SlideModal = ({
  username,
  photoURL,
  name,
  verified,
  following,
  followers,
  openSlideLeft,
  handleCloseSlideLeft,
  handleOpenModal,
}: SlideModalProps) => {
  const allStats: Readonly<Stats[]> = [
    ["following", "Following", following.length],
    ["followers", "Followers", followers.length],
  ];

  return (
    <Modal
      className="!p-0"
      modalAnimation={leftToRightVariant}
      modalClassName="pb-4 pl-2 h-screen overflow-y-auto w-72 bg-main-background-1"
      open={openSlideLeft}
      closeModal={handleCloseSlideLeft}
    >
      <MainHeader
        useActionButton
        disabledBlurBG
        className="flex flex-row-reverse justify-between "
        titleClassName="text-base xs:text-xl"
        iconName="XMarkIcon"
        title="Account info"
        tip="Close"
        action={handleCloseSlideLeft}
      />
      <section className="mt-2">
        <div className="flex flex-col gap-2 p-4">
          <div className="flex justify-between w-full">
            <UserAvatar
              className="bg-main-background hover:brightness-100 [&>figure>span]:[transition:200ms] [&:hover>figure>span]:brightness-75"
              username={username}
              src={photoURL}
              alt={name}
              size={40}
            />
            <div className="p-1">
              <div className="border flex justify-center items-center border-light-border dark:border-dark-border w-7 h-7 rounded-full bg-main-background-1 brightness-100 hover:brightness-75 cursor-pointer transition-[filter] duration-200">
                <HeroIcon
                  iconName="PlusIcon"
                  className="h-4 w-4 fill-light-primary dark:fill-dark-primary"
                />
              </div>
            </div>
          </div>
          <div>
            <UserName name={name} username={username} verified={verified} />
            <UserUsername username={username} />
          </div>
          <div className="flex w-full gap-5">
            {allStats.map(([id, label, stat]) => (
              <Link
                href={`${username}/${id}`}
                key={id}
                className="hover-animation flex h-4 items-center gap-1 border-b border-b-transparent 
          outline-none hover:border-b-light-primary focus-visible:border-b-light-primary
          dark:hover:border-b-dark-primary dark:focus-visible:border-b-dark-primary text-sm"
              >
                <p className="font-bold">{stat}</p>
                <p className="text-light-secondary dark:text-dark-secondary">
                  {label}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <MenuLink
            className={cn(
              "flex items-center w-full gap-5 duration-200 relative hover:bg-main-background-3 text-xl"
            )}
            href={`user/${username}`}
            disabledMenu
          >
            <HeroIcon iconName="UserIcon" />
            <span className="font-semibold select-none">Profile</span>
          </MenuLink>
          <div
            className={cn(
              "relative duration-200 p-4 flex w-full gap-5 cursor-pointer hover:bg-main-background-3 text-xl"
            )}
            onClick={() => {
              handleOpenModal("twitterBlue");
            }}
          >
            <CustomIcon
              iconName="TwitterBlueIcon"
              className="h-6 w-6 fill-accent-blue"
              solid
            />
            <span className="font-semibold select-none">Twitter Blue</span>
          </div>
          <MenuLink
            className={cn(
              "flex items-center w-full gap-5 duration-200 relative hover:bg-main-background-3 text-xl"
            )}
            href={`${username}/lists`}
            disabledMenu
          >
            <HeroIcon iconName="QueueListIcon" />
            <span className="font-semibold select-none">Lists</span>
          </MenuLink>
          <MenuLink
            className={cn(
              "flex items-center w-full gap-5 duration-200 relative hover:bg-main-background-3 text-xl"
            )}
            href={`i/bookmarks`}
            disabledMenu
          >
            <HeroIcon iconName="BookmarkIcon" />
            <span className="font-semibold select-none">Bookmarks</span>
          </MenuLink>
          <div
            className={cn(
              "relative duration-200 p-4 flex w-full gap-5 cursor-pointer hover:bg-main-background-3 text-xl"
            )}
            onClick={() => {
              handleOpenModal("verifiedOrgs");
            }}
          >
            <CustomIcon iconName="VerificationBadge" />
            <span className="font-semibold select-none">Verified Orgs</span>
          </div>
          <HrLine className="mx-4" />
        </div>
      </section>
    </Modal>
  );
};
