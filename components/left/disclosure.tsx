import cn from "clsx";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

import { HeroIcon } from "../ui/hero-icon";
import { preventBubbling } from "@/lib/utils";

import type { IconName } from "../ui/hero-icon";
import type { Variants } from "framer-motion";

export const variants: Variants = {
  initial: { opacity: 0, height: 0, display: "none" },
  animate: {
    opacity: 1,
    height: "auto",
    display: "block",
    transition: {
      type: "spring",
      duration: 0.4,
      opacity: {
        duration: 0.25,
        delay: 0.1,
      },
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      height: 0.3,
      opacity: {
        duration: 0.15,
      },
    },
    transitionEnd: {
      display: "none",
    },
  },
};

type DisclosureLink = {
  elem: "a" | "button" | "link";
  text: string;
  icon: IconName;
  href?: string;
  func?: () => void;
  disabled?: boolean;
};

interface Props {
  classDisc?: string;
  textButton: string;
  linksPanel: DisclosureLink[];
}

export const DisclosureItem: React.FC<Props> = ({
  textButton,
  linksPanel,
  classDisc,
}): JSX.Element => {
  const panelCN =
    "px-4 py-[10px] text-start items-center flex w-full gap-5 hover:bg-main-background-3 duration-200";

  return (
    <>
      <AnimatePresence>
        <Disclosure>
          {({ open }) => (
            /* Use the `open` state to conditionally change the direction of an icon. */
            <>
              <Disclosure.Button
                role={"menuitem"}
                tabIndex={-1}
                className={cn(
                  "w-full flex justify-between p-4 duration-200 text-base relative outline-none",
                  classDisc
                )}
              >
                {textButton}
                <HeroIcon
                  className={cn(
                    " w-5 h-5 duration-200 ease-in-out",
                    open && "-rotate-180 transform text-main-accent"
                  )}
                  iconName="ChevronDownIcon"
                />
              </Disclosure.Button>
              <AnimatePresence>
                {open && (
                  <Disclosure.Panel
                    className="flex flex-col w-full text-base"
                    as={motion.div}
                    {...variants}
                    static
                  >
                    {linksPanel.map(
                      (
                        { text, href, elem, func, icon, disabled = false },
                        i
                      ) => {
                        if (elem == "button") {
                          return (
                            <button
                              role={"menuitem"}
                              key={i}
                              className={cn(
                                panelCN,
                                disabled && "cursor-not-allowed"
                              )}
                              onClick={func!}
                            >
                              <HeroIcon className="w-5 h-5" iconName={icon} />
                              {text}
                            </button>
                          );
                        } else if (elem == "a" && href) {
                          return (
                            <a
                              role={"menuitem"}
                              key={i}
                              target="_blank"
                              className={cn(
                                panelCN,
                                disabled && "cursor-not-allowed"
                              )}
                              href={href}
                            >
                              <HeroIcon className="w-5 h-5" iconName={icon} />
                              {text}
                            </a>
                          );
                        }

                        return (
                          <Link
                            key={i}
                            href={href!}
                            legacyBehavior
                            prefetch={disabled ? false : undefined}
                          >
                            <a
                              className={cn(
                                panelCN,
                                disabled && "cursor-not-allowed"
                              )}
                              onClick={disabled ? preventBubbling() : undefined}
                            >
                              <HeroIcon className=" w-5 h-5" iconName={icon} />
                              {text}
                            </a>
                          </Link>
                        );
                      }
                    )}
                  </Disclosure.Panel>
                )}
              </AnimatePresence>
            </>
          )}
        </Disclosure>
      </AnimatePresence>
    </>
  );
};
