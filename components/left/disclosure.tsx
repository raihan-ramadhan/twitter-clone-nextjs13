import { motion, AnimatePresence } from "framer-motion";
import { Disclosure } from "@headlessui/react";
import { HeroIcon } from "../ui/hero-icon";
import cn from "clsx";
import Link from "next/link";
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
  textButton: string;
  linksPanel: DisclosureLink[];
}

export const DisclosureItem: React.FC<Props> = ({
  textButton,
  linksPanel,
}): JSX.Element => {
  const panelCN =
    "px-4 py-[10px] text-start items-center flex w-full gap-5 hover:bg-black/5 duration-200";

  return (
    <>
      <AnimatePresence>
        <Disclosure as="div">
          {({ open }) => (
            /* Use the `open` state to conditionally change the direction of an icon. */
            <>
              <Disclosure.Button className="w-full flex justify-between p-4 hover:bg-black/5 duration-200">
                {textButton}
                <HeroIcon
                  className={cn(
                    " w-5 h-5 duration-200 ease-in-out",
                    open && "-rotate-180 transform text-[#1D9BF0]"
                  )}
                  iconName="ChevronDownIcon"
                />
              </Disclosure.Button>
              <AnimatePresence>
                {open && (
                  <Disclosure.Panel
                    className="flex flex-col w-full"
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
                            className={cn(
                              panelCN,
                              disabled && "cursor-not-allowed"
                            )}
                            href={disabled ? "javascript:;" : href!}
                          >
                            <HeroIcon className=" w-5 h-5" iconName={icon} />
                            {text}
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