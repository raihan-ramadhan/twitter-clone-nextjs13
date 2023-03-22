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
      <Menu className="relative hidden xs:block w-full" as="div">
        {({ open }): JSX.Element => (
          <>
            <div
              onClick={() => setMyOverlay(false)}
              className={cn(
                "fixed z-0 inset-0 bg-transparent",
                myOverlay ? "block" : "hidden"
              )}
            />
            <Menu.Button
              onClick={() => setMyOverlay(!myOverlay)}
              className="group relative flex outline-none z-10 w-full py-1 justify-center xl:justify-start"
            >
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
                  className="text-xl w-80 absolute bottom-0 font-medium  bg-white z-10 rounded-md drop-shadow-[0_0_5px_rgba(0,0,0,0.15)]"
                  as={motion.div}
                  {...variants}
                  static
                >
                  <Menu.Item>
                    {({ active }): JSX.Element => (
                      <MenuLink
                        classLink={cn(
                          "flex w-full gap-5 p-4 duration-200",
                          active && "bg-black/5"
                        )}
                        href="/raihan/topics"
                        disabled={true}
                      >
                        <HeroIcon iconName="ChatBubbleOvalLeftEllipsisIcon" />
                        Topics
                      </MenuLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }): JSX.Element => (
                      <MenuLink
                        classLink={cn("", active && "bg-black/5")}
                        href="/raihan/lists"
                        disabled={true}
                      >
                        <HeroIcon iconName="QueueListIcon" />
                        Lists
                      </MenuLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }): JSX.Element => (
                      <MenuLink
                        classLink={cn(active && "bg-black/5")}
                        href="/i/circles"
                        disabled={false}
                      >
                        <HeroIcon iconName="UsersIcon" />
                        Twitter Circle
                      </MenuLink>
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
}
