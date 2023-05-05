import cn from "clsx";
import { Menu } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

import { Modal } from "../modal/modal";
import { Button } from "../ui/button";
import { ToolTip } from "../ui/tooltip";
import { useAuth } from "@/lib/context/auth-context";
import { Overlay } from "../ui/overlay";
import { useModal } from "@/lib/hooks/useModal";
import { HeroIcon } from "../ui/hero-icon";
import { UserName } from "../user/user-name";
import { UserAvatar } from "../user/user-avatar";
import { CustomIcon } from "../ui/custom-icons";
import { UserUsername } from "../user/user-username";
import { SignoutModal } from "../modal/signout-modal";
import { useShowModal } from "@/lib/context/show-modal-context";

import type { Variants } from "framer-motion";
import { User } from "@/lib/types/user";

export const variants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const LeftProfile = () => {
  const { user, signOut } = useAuth();
  const { setShowModal } = useShowModal();
  const { open, openModal, closeModal } = useModal();

  const { name, username, verified, photoURL } = user as User;

  const handleCloseModal = () => {
    closeModal();
    setShowModal(false);
  };

  return (
    <>
      <Modal
        modalClassName="bg-main-background-1 w-full max-w-xs p-8 rounded-2xl hover-animation"
        open={open}
        closeModal={handleCloseModal}
      >
        <SignoutModal signOut={signOut} closeModal={handleCloseModal} />
      </Modal>
      <Menu
        className="relative hidden xs:block ml-[4px] md:ml-[12px] xl:ml-0"
        as="section"
      >
        {({ open }): JSX.Element => (
          <div className="-z-10">
            <Overlay open={open} />
            <Menu.Button
              className={cn(
                `relative group xl:flex p-2 my-4 xl:w-full bg-main-primary-1 rounded-full items-center justify-between hover:bg-light-primary/10 focus-visible:bg-light-primary/10 active:bg-light-primary/20 dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20 dark:focus-visible::bg-dark-primary/20 hover-animation`
              )}
            >
              <ToolTip
                tip={"Accounts"}
                className="inline xl:hidden -translate-y-[150%] !opacity-75"
              />
              <div className="flex truncate gap-3 w-full">
                <UserAvatar src={photoURL} alt={"logo"} size={40} />
                <div className="hidden truncate text-start leading-5 xl:block flex-1">
                  <UserName name={name} className="start" verified={verified} />
                  <UserUsername username={username} disableLink />
                </div>
              </div>
              <HeroIcon
                className="hidden h-6 w-6 xl:block"
                iconName="EllipsisHorizontalIcon"
              />
            </Menu.Button>
            <AnimatePresence>
              {open && (
                <Menu.Items
                  className="py-3 z-50 absolute w-[275px] lg:w-[300px] left-0 xl:left-1/2 xl:-translate-x-1/2 -top-48 menu-container"
                  as={motion.div}
                  {...variants}
                  static
                >
                  <Menu.Item
                    className="flex items-center justify-between gap-4 border-b
                 border-light-border dark:border-dark-border px-4 py-3"
                    as="div"
                    disabled
                  >
                    <div className="flex items-center gap-3 truncate">
                      <UserAvatar src={photoURL} alt={"photo"} />
                      <div className="truncate flex flex-col flex-1">
                        <UserName name={name} verified={verified} />
                        <UserUsername username={username} disableLink />
                      </div>
                    </div>
                    <i>
                      <HeroIcon
                        className="h-5 w-5 text-main-accent"
                        iconName="CheckIcon"
                      />
                    </i>
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }): JSX.Element => (
                      <Button
                        className={cn(
                          "flex w-full gap-3 px-4 py-3 font-semibold cursor-not-allowed rounded-none",
                          active && "bg-main-background-3"
                        )}
                        onClick={() => {
                          console.log("Coming Soon");
                        }}
                      >
                        Add an Existing Account
                      </Button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }): JSX.Element => (
                      <Button
                        className={cn(
                          "flex w-full gap-3 px-4 py-3 font-semibold rounded-none",
                          active && "bg-main-background-3 "
                        )}
                        onClick={() => {
                          openModal();
                          setShowModal(true);
                        }}
                      >
                        Log out @{username}
                      </Button>
                    )}
                  </Menu.Item>

                  <i
                    className="absolute -bottom-[10px] left-2 translate-x-1/2 rotate-180
                 [filter:drop-shadow(#cfd9de_1px_-1px_1px)]
                 dark:[filter:drop-shadow(#333639_1px_-1px_1px)]
                 xl:left-1/2 xl:-translate-x-1/2"
                  >
                    <CustomIcon
                      className="h-4 w-6 fill-main-background-1"
                      iconName="TriangleIcon"
                    />
                  </i>
                </Menu.Items>
              )}
            </AnimatePresence>
          </div>
        )}
      </Menu>
    </>
  );
};
