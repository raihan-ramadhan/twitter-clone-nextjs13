"use client";
import cn from "clsx";
import { Menu } from "@headlessui/react";
import { HeroIcon } from "../ui/hero-icon";
import { useState } from "react";
import { LeftMenuItems } from "./left-menu-items";
import { motion, AnimatePresence } from "framer-motion";
import { LeftMenuDisclosure } from "./left-menu-disclosure";
import type { Variants } from "framer-motion";

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
              className="group flex outline-none z-10 w-full py-1 justify-center xl:justify-start"
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
                  className="absolute -top-[288px] text-xl w-80 drop-shadow-[0_0_5px_rgba(0,0,0,0.15)]  font-medium bg-white z-10 rounded-t-md "
                  as={motion.div}
                  {...variants}
                  static
                >
                  <LeftMenuItems
                    myOverlay="myOverlay"
                    setMyOverlay={setMyOverlay}
                  />
                  <div className="bg-white rounded-b-md text-base absolute w-full">
                    <LeftMenuDisclosure
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
                    <LeftMenuDisclosure
                      textButton="Professional Tools"
                      linksPanel={[
                        {
                          elem: "button",
                          text: "Twitter for Professional",
                          icon: "RocketLaunchIcon",
                          func: () => {
                            console.log("TEST");
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
                          disabled: true,
                        },
                      ]}
                    />
                    <LeftMenuDisclosure
                      textButton="Settings and Support"
                      linksPanel={[
                        {
                          elem: "link",
                          text: "Settings and privacy",
                          href: "/settings",
                          icon: "Cog8ToothIcon",
                          disabled: true,
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
                            console.log("TEST");
                          },
                          icon: "PaintBrushIcon",
                        },
                      ]}
                    />
                  </div>
                </Menu.Items>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    </>
  );
}
