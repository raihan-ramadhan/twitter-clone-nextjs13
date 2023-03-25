"use client";
import cn from "clsx";
import { Menu } from "@headlessui/react";
import { HeroIcon } from "../ui/hero-icon";
import { MenuItems } from "./menu-items";
import { motion, AnimatePresence } from "framer-motion";
import { DisclosureItems } from "./disclosure-items";
import { Overlay } from "../ui/overlay";
import { useModal } from "@/lib/hooks/useModal";
import { Modal } from "../modal/modal";
import type { Variants } from "framer-motion";
import { DisplayModal } from "../modal/display-modal";

export const variants: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", duration: 0.4 },
  },
  exit: { opacity: 0, y: 50, transition: { duration: 0.2 } },
};

export const LeftMore = (): JSX.Element => {
  const { open, openModal, closeModal } = useModal();

  return (
    <>
      <Modal
        modalClassName="max-w-xl bg-white w-full p-8 rounded-2xl hover-animation"
        open={open}
        closeModal={closeModal}
      >
        <DisplayModal closeModal={closeModal} />
      </Modal>
      <Menu className="relative hidden xs:block w-full" as="div">
        {({ open, close }): JSX.Element => (
          <>
            {open ? <Overlay open={open} zIndex="z-10" /> : <></>}
            <Menu.Button className="group flex outline-none z-10 w-full py-1 justify-center xl:justify-start">
              <div
                className={cn(
                  `flex gap-5 text-xl rounded-full p-3 hover-animation group-hover:bg-black/10`
                )}
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
                <Menu.Items
                  className="absolute -top-[288px] text-xl w-80 drop-shadow-[0_0_5px_rgba(0,0,0,0.15)]  font-medium bg-white z-10 rounded-t-md "
                  as={motion.div}
                  {...variants}
                  static
                >
                  <MenuItems />
                  <div className="bg-white rounded-b-md text-base absolute w-full">
                    <DisclosureItems openModal={openModal} closeMenu={close} />
                  </div>
                </Menu.Items>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    </>
  );
};
