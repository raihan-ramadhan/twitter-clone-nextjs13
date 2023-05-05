"use client";
import cn from "clsx";
import { Menu } from "@headlessui/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ToolTip } from "../ui/tooltip";
import { useAuth } from "@/lib/context/auth-context";
import { HeroIcon } from "../ui/hero-icon";
import { MenuLink } from "./menu-link";
import { useModal } from "@/lib/hooks/useModal";
import { CustomIcon } from "../ui/custom-icons";
import { useShowModal } from "@/lib/context/show-modal-context";
import { LeftMoreModal } from "../modal/left/left-more-modal";
import { DisclosureItem } from "./disclosure";

import type { User } from "@/lib/types/user";
import type { Variants } from "framer-motion";

export const variants: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", duration: 0.4 },
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: { duration: 0.2 },
  },
};

export type ModalLeftMore =
  | "display"
  | "professional"
  | "verifiedOrgs"
  | "circle"
  | "keyboard"
  | null;

export const LeftMore = (): JSX.Element => {
  const { open, openModal, closeModal } = useModal();
  const { setShowModal } = useShowModal();
  const { username } = useAuth().user as User;

  const [currentModal, setCurrentModal] = useState<ModalLeftMore>(null);

  const handleCloseModal = () => {
    setCurrentModal(null);
    setShowModal(false);
    closeModal();
  };

  const handleOpenModal = (
    targetModal: ModalLeftMore,
    callback: () => void
  ) => {
    setCurrentModal(targetModal);
    setShowModal(true);
    openModal();
    callback();
  };

  return (
    <>
      <LeftMoreModal
        currentModal={currentModal}
        handleCloseModal={handleCloseModal}
        open={open}
      />
      <Menu
        className="relative hidden xs:block w-full outline-none py-1"
        as="div"
      >
        {({ open, close }): JSX.Element => (
          <>
            <Menu.Button className="group outline-none flex z-0 w-full justify-center xl:justify-start">
              <div
                className={cn(`flex gap-5 text-xl rounded-full custom-button custom-button xl:pr-6 group-hover:bg-light-primary/10 group-focus-visible:ring-2 
                group-focus-visible:ring-[#878a8c] dark:group-hover:bg-dark-primary/10 
                dark:group-focus-visible:ring-white`)}
              >
                <ToolTip
                  tip="More"
                  className="inline xl:hidden translate-y-[200%] mt-1 !opacity-75"
                />
                <HeroIcon
                  className="h-7 w-7"
                  iconName="EllipsisHorizontalCircleIcon"
                />{" "}
                <p className="hidden xl:block">More</p>
              </div>
            </Menu.Button>

            <AnimatePresence>
              {open && (
                <Menu.Items
                  className="overflow-hidden absolute -top-[348px] text-xl w-80 font-medium z-20 menu-container"
                  as={motion.div}
                  {...variants}
                  static
                >
                  <Menu.Item>
                    {({ active }): JSX.Element => (
                      <MenuLink
                        className={cn(
                          "flex w-full gap-5 duration-200 relative",
                          active &&
                            "bg-main-background-3 after:w-full after:h-full after:absolute after:inset-0 after:border-2 after:border-main-accent after:contrast-75 after:brightness-125 after:rounded-t-xl"
                        )}
                        href={`/${username}/topics`}
                        disabledMenu
                      >
                        <HeroIcon iconName="ChatBubbleOvalLeftEllipsisIcon" />
                        Topics
                      </MenuLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }): JSX.Element => (
                      <MenuLink
                        className={cn(
                          "relative",
                          active &&
                            "bg-main-background-3 after:w-full after:h-full after:absolute after:inset-0 after:border-2 after:border-main-accent after:contrast-75 after:brightness-125"
                        )}
                        href={`/${username}/lists`}
                        disabledMenu
                      >
                        <HeroIcon iconName="QueueListIcon" />
                        Lists
                      </MenuLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }): JSX.Element => (
                      <div
                        className={cn(
                          "relative duration-200 p-4 flex w-full gap-5 cursor-pointer",
                          active &&
                            "bg-main-background-3 after:w-full after:h-full after:absolute after:inset-0 after:border-2 after:border-main-accent after:contrast-75 after:brightness-125"
                        )}
                        onClick={() => {
                          handleOpenModal("circle", close);
                        }}
                      >
                        <HeroIcon iconName="UsersIcon" />
                        Twitter Circle
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }): JSX.Element => (
                      <div
                        className={cn(
                          "relative duration-200 p-4 flex w-full gap-5 cursor-pointer",
                          active &&
                            "bg-main-background-3 after:w-full after:h-full after:absolute after:inset-0 after:border-2 after:border-main-accent after:contrast-75 after:brightness-125"
                        )}
                        onClick={() => {
                          handleOpenModal("verifiedOrgs", close);
                        }}
                      >
                        <CustomIcon iconName="VerificationBadge" />
                        Verified Orgs
                      </div>
                    )}
                  </Menu.Item>
                  <hr className="border-t-light-border dark:border-t-dark-border mx-3" />
                  <Menu.Item>
                    {({ active }): JSX.Element => (
                      <DisclosureItem
                        classDisc={cn(
                          "hover:bg-main-background-3 hover:after:w-full hover:after:h-full hover:after:absolute hover:after:inset-0 hover:after:border-2 hover:after:border-main-accent hover:after:contrast-75 hover:after:brightness-125 after:h-full after:absolute after:inset-0",
                          active &&
                            "bg-main-background-3 after:border-2 after:border-main-accent after:contrast-75 after:brightness-125"
                        )}
                        textButton="Creator Studio"
                        linksPanel={[
                          {
                            elem: "a",
                            text: "Analytics",
                            href: "https://analytics.twitter.com/",
                            icon: "ChartBarSquareIcon",
                          },
                        ]}
                      />
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }): JSX.Element => (
                      <DisclosureItem
                        classDisc={cn(
                          "hover:bg-main-background-3 hover:after:w-full hover:after:h-full hover:after:absolute hover:after:inset-0 hover:after:border-2 hover:after:border-main-accent hover:after:contrast-75 hover:after:brightness-125 after:h-full after:absolute after:inset-0",
                          active &&
                            "bg-main-background-3 after:border-2 after:border-main-accent after:contrast-75 after:brightness-125"
                        )}
                        textButton="Professional Tools"
                        linksPanel={[
                          {
                            elem: "button",
                            text: "Twitter for Professional",
                            icon: "RocketLaunchIcon",
                            func: () => {
                              handleOpenModal("professional", close);
                            },
                          },
                          {
                            elem: "a",
                            text: "Twitter Ads",
                            href: "https://ads.twitter.com/?ref=gl-tw-tw-twitter-ads-rweb",
                            icon: "ArrowTopRightOnSquareIcon",
                          },
                          {
                            elem: "link",
                            text: "Monetization",
                            href: "/settings/monetization",
                            icon: "BanknotesIcon",
                          },
                        ]}
                      />
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }): JSX.Element => (
                      <DisclosureItem
                        classDisc={cn(
                          "hover:bg-main-background-3 hover:after:w-full hover:after:h-full hover:after:absolute hover:after:inset-0 hover:after:border-2 hover:after:border-main-accent hover:after:contrast-75 hover:after:brightness-125 after:w-full after:h-full after:absolute after:inset-0 ",
                          active &&
                            "bg-main-background-3 after:border-2 after:border-main-accent after:contrast-75 after:brightness-125",
                          !active && "after:rounded-b-xl"
                        )}
                        textButton="Settings and Support"
                        linksPanel={[
                          {
                            elem: "link",
                            text: "Settings and privacy",
                            href: "/settings/account",
                            icon: "Cog8ToothIcon",
                          },
                          {
                            elem: "a",
                            text: "Help Center",
                            href: "https://help.twitter.com",
                            icon: "QuestionMarkCircleIcon",
                          },
                          {
                            elem: "button",
                            text: "Display",
                            func: () => {
                              handleOpenModal("display", close);
                            },
                            icon: "PaintBrushIcon",
                          },
                          {
                            elem: "button",
                            text: "Keyboard shortcuts",
                            func: () => {
                              handleOpenModal("keyboard", close);
                            },
                            icon: "AdjustmentsHorizontalIcon",
                          },
                        ]}
                      />
                    )}
                  </Menu.Item>
                </Menu.Items>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    </>
  );
};
