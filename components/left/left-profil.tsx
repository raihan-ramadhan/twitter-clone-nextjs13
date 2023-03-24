import { motion, AnimatePresence } from "framer-motion";
import { HeroIcon } from "../ui/hero-icon";
import { Menu } from "@headlessui/react";
import { UserUsername } from "../user/user-username";
import { CustomIcon } from "../ui/custom-icons";
import { UserAvatar } from "../user/user-avatar";
import { UserName } from "../user/user-name";
import { Overlay } from "../ui/overlay";
import { Button } from "../ui/button";
import cn from "clsx";
import type { Variants } from "framer-motion";

export const variants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const LeftProfil = (): JSX.Element => {
  return (
    <>
      <Menu
        className="relative hidden xs:block z-0 ml-[4px] md:ml-[12px] xl:ml-0"
        as="section"
      >
        {({ open }): JSX.Element => (
          <>
            <Overlay open={open} />
            <Menu.Button
              className={cn(
                `relative xl:flex p-2 z-10 my-4 xl:w-full bg-white rounded-full items-center justify-between hover:bg-light-primary/10 active:bg-light-primary/20
                 dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20 hover-animation`
              )}
            >
              <div className="flex truncate gap-3 w-full">
                <UserAvatar src={"/assets/test.jpg"} alt={"logo"} size={40} />
                <div className="hidden truncate text-start leading-5 xl:block flex-1">
                  <UserName name={"han"} className="start" verified={true} />
                  <UserUsername username={"raihan_22"} disableLink />
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
                  className="py-3 z-30 absolute w-[275px] xl:w-[300px] left-0 xl:left-1/2 xl:-translate-x-1/2 -top-48 bg-white drop-shadow-[0_0_5px_rgba(0,0,0,0.15)] rounded-2xl"
                  as={motion.div}
                  {...variants}
                  static
                >
                  <Menu.Item
                    className="flex items-center justify-between gap-4 border-b
                 border-light-border px-4 py-3 dark:border-dark-border"
                    as="div"
                    disabled
                  >
                    <div className="flex items-center gap-3 truncate">
                      <UserAvatar src={"/assets/test.jpg"} alt={"photo"} />
                      <div className="truncate flex flex-col flex-1">
                        <UserName name={"raihan"} verified={true} />
                        <UserUsername username={"han"} disableLink />
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
                          "flex w-full gap-3 px-4 py-3 font-semibold",
                          active && "bg-black/5"
                        )}
                        onClick={() => {
                          console.log("TEST");
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
                          "flex w-full gap-3 px-4 py-3 font-semibold",
                          active && "bg-black/5"
                        )}
                        onClick={() => {
                          console.log("TEST");
                        }}
                      >
                        Log out @{"han"}
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
                      className="h-4 w-6 fill-white"
                      iconName="TriangleIcon"
                    />
                  </i>
                </Menu.Items>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    </>
  );
};
