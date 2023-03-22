"use client";

import { Menu } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroIcon } from "../ui/hero-icon";
import cn from "clsx";
import type { Variants } from "framer-motion";
import { MenuLink } from "./left-menu-link";
import { useState } from "react";

export const variants: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", duration: 0.4 },
  },
  exit: { opacity: 0, y: 50, transition: { duration: 0.2 } },
};

export function LeftMore() {
  const [myOverlay, setMyOverlay] = useState(false);

  return (
    <>
      <Menu className="relative" as="div">
        {({ open }): JSX.Element => (
          <>
            <Overlay myOverlay={myOverlay} setMyOverlay={setMyOverlay} />
            <Menu.Button
              onClick={() => setMyOverlay(!myOverlay)}
              className="group relative flex outline-none z-10 w-full py-1 justify-center xl:justify-start"
            >
              <div
                className={cn(
                  `flex gap-4 text-xl rounded-full p-3 hover-animation group-hover:bg-black/10`
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
                  className="absolute bottom-0 font-medium xl:w-11/12 bg-white z-10"
                  as={motion.div}
                  {...variants}
                  static
                >
                  <Menu.Item>
                    {({ active }): JSX.Element => (
                      <MenuLink
                        className={cn(
                          "flex w-full cursor-not-allowed gap-3 rounded-t-md p-4 duration-200",
                          active && "bg-main-sidebar-background"
                        )}
                        href="/settings"
                      >
                        <HeroIcon iconName="Cog8ToothIcon" />
                        Settings and privacy
                      </MenuLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }): JSX.Element => (
                      <MenuLink
                        className={cn(
                          "flex w-full cursor-not-allowed gap-3 rounded-t-md p-4 duration-200",
                          active && "bg-main-sidebar-background"
                        )}
                        href="/help-center"
                      >
                        <HeroIcon iconName="QuestionMarkCircleIcon" />
                        Help center
                      </MenuLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }): JSX.Element => (
                      <MenuLink
                        className={cn(
                          "flex w-full cursor-not-allowed gap-3 rounded-t-md p-4 duration-200",
                          active && "bg-main-sidebar-background"
                        )}
                        href="/help-center"
                        // onClick={preventBubbling()}
                      >
                        <HeroIcon iconName="QuestionMarkCircleIcon" />
                        Help center
                      </MenuLink>
                    )}
                  </Menu.Item>
                  {/* <Menu.Item>
                    {({ active }): JSX.Element => (
                      // <Button
                      //   className={cn(
                      //     'flex w-full gap-3 rounded-none rounded-b-md p-4 duration-200',
                      //     active && 'bg-main-sidebar-background'
                      //   )}
                      //   onClick={openModal}
                      // >
                      //   <HeroIcon iconName='PaintBrushIcon' />
                      //   Display
                      // </Button>
                    )}
                  </Menu.Item> */}
                </Menu.Items>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    </>
  );
}

function Overlay({
  myOverlay,
  setMyOverlay,
}: {
  myOverlay: boolean;
  setMyOverlay: Function;
}): JSX.Element {
  return (
    <div
      onClick={() => setMyOverlay(false)}
      className={cn(
        "fixed z-0 inset-0 bg-transparent",
        myOverlay ? "block" : "hidden"
      )}
    />
  );
}
