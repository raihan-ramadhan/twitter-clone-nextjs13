"use client";
import cn from "clsx";
import { Menu } from "@headlessui/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Modal } from "../modal/modal";
import { useAuth } from "@/lib/context/auth-context";
import { Overlay } from "../ui/overlay";
import { HeroIcon } from "../ui/hero-icon";
import { MenuLink } from "./menu-link";
import { useModal } from "@/lib/hooks/useModal";
import { useShowModal } from "@/lib/context/show-modal-context";
import { DisplayModal } from "../modal/display-modal";
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

type ModalLeftMore =
  | "display"
  | "professional"
  | "verifiedOrgs"
  | "circle"
  | "keyboard"
  | null;

export const LeftMore = (): JSX.Element => {
  const { open, openModal, closeModal } = useModal();
  const { setShowModal } = useShowModal();
  const { user } = useAuth();
  const { username } = user as User;

  const [currentModal, setCurrentModal] = useState<ModalLeftMore>(null);

  const handleCloseModal = () => {
    setCurrentModal(null);
    setShowModal(false);
    closeModal();
  };

  function renderComponentBasedOnCase(caseValue: ModalLeftMore): JSX.Element {
    switch (caseValue) {
      case "display":
        return <DisplayModal closeModal={handleCloseModal} />;
      case "professional":
        return <div>Twitter for Professional Coming Soon</div>;
      case "circle":
        return <div>Twitter Circle Coming Soon</div>;
      case "keyboard":
        return <div>Keyboard Shortcut Coming Soon</div>;
      case "verifiedOrgs":
        return <div>Verified Orgs Coming Soon</div>;
      default:
        return <div className="text-red-400">Invalid case value</div>;
    }
  }

  return (
    <>
      <Modal
        modalClassName="max-w-xl bg-main-background-1 w-full p-8 rounded-2xl hover-animation"
        open={open}
        closeModal={handleCloseModal}
      >
        {renderComponentBasedOnCase(currentModal)}
      </Modal>
      <Menu className="relative hidden xs:block w-full outline-none" as="div">
        {({ open, close }): JSX.Element => (
          <>
            <Menu.Button className="group outline-none flex z-0 w-full py-1 justify-center xl:justify-start">
              <div
                className={cn(`flex gap-5 text-xl rounded-full custom-button custom-button xl:pr-6 group-hover:bg-light-primary/10 group-focus-visible:ring-2 
                group-focus-visible:ring-[#878a8c] dark:group-hover:bg-dark-primary/10 
                dark:group-focus-visible:ring-white`)}
              >
                <HeroIcon
                  className="h-7 w-7"
                  iconName="EllipsisHorizontalCircleIcon"
                />{" "}
                <p className="hidden xl:block">More</p>
              </div>
            </Menu.Button>

            <AnimatePresence>
              {open && (
                <>
                  <Overlay open={open} close={close} zIndex="z-10" />
                  <Menu.Items
                    className="overflow-hidden absolute -top-[288px] text-xl w-80 font-medium z-20 menu-container"
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
                            close();
                            openModal();
                            setShowModal(true);
                            setCurrentModal("circle");
                          }}
                        >
                          <HeroIcon iconName="UsersIcon" />
                          Twitter Circle
                        </div>
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
                                close();
                                openModal();
                                setShowModal(true);
                                setCurrentModal("professional");
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
                                close();
                                openModal();
                                setShowModal(true);
                                setCurrentModal("display");
                              },
                              icon: "PaintBrushIcon",
                            },
                          ]}
                        />
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    </>
  );
};
