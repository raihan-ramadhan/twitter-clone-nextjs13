"use client";
import cn from "clsx";
import Link from "next/link";

import { ToolTip } from "../ui/tooltip";
import { Button } from "../ui/button";
import { useAuth } from "@/lib/context/auth-context";
import { LeftMore } from "./left-more";
import { IconName } from "../ui/hero-icon";
import { useWindow } from "@/lib/context/window-context";
import { LeftProfile } from "./left-profile";
import { CustomIcon } from "../ui/custom-icons";
import { LeftNavLink } from "./left-nav-link";
import { useShowModal } from "@/lib/context/show-modal-context";
import { LeftTwitterBlue } from "./left-twitter-blue";

export type NavLink = {
  href: string;
  linkName: string;
  iconName: IconName;
  disabled?: boolean;
  canBeHidden?: boolean;
};

const navLinks: Readonly<NavLink[]> = [
  {
    href: "/home",
    linkName: "Home",
    iconName: "HomeIcon",
  },
  {
    href: "/explore",
    linkName: "Explore",
    iconName: "HashtagIcon",
  },
  {
    href: "/notifications",
    linkName: "Notifications",
    iconName: "BellIcon",
    disabled: true,
  },
  {
    href: "/messages",
    linkName: "Messages",
    iconName: "EnvelopeIcon",
    disabled: true,
  },
  {
    href: "/i/bookmarks",
    linkName: "Bookmarks",
    iconName: "BookmarkIcon",
    canBeHidden: true,
    disabled: true,
  },
];

const Left = (): JSX.Element => {
  const { showModal } = useShowModal();

  const { user } = useAuth();
  const { isMobile, width: windowWidth, height: windowHeight } = useWindow();

  const allNavLinks: NavLink[] =
    windowHeight > 600
      ? navLinks.slice()
      : navLinks.filter((link) => link.linkName !== "Bookmarks");

  {
    /* i want use overflow-y-auto here to make scrollable vertical nav but somehow the popover menu will make this scrollable horizontal too which we don't want*/
  }
  return (
    <header
      className={cn(
        "bg-main-background-1 z-10 flex flex-col justify-between fixed xs:h-screen xs:sticky xs:top-0 xs:bottom-0 left-0 xs:left-[unset] right-0 xs:right-[unset] bottom-0 px-2 border-t xs:border-t-0 border-light-border dark:border-dark-border xs:w-20 md:w-24 xl:w-full xl:max-w-[275px]"
      )}
    >
      <div className="flex flex-col justify-between">
        <section className="flex flex-col items-center xl:items-start">
          <h1 className="hidden xs:flex pt-[2px]">
            <Link
              href={user ? "/home" : "/"}
              className="custom-button text-accent-blue dark:text-twitter-icon transition focus-visible:bg-accent-blue/10 hover:bg-main-accent/10 outline-none focus-visible:ring-2 focus-visible:ring-[#8ecdf8] "
            >
              <CustomIcon className="w-7 h-7" iconName="TwitterIcon" />
            </Link>
          </h1>
          <nav className="flex xs:flex-col xs:my-1 py-1 xs:py-0 flex-row w-full z-10">
            {user && (
              <>
                {allNavLinks.map(({ iconName, ...linkData }) => (
                  <LeftNavLink
                    iconName={
                      iconName == "HashtagIcon" && windowWidth < 1024
                        ? "MagnifyingGlassIcon"
                        : iconName
                    }
                    {...linkData}
                    showModal={showModal}
                    key={linkData.href}
                  />
                ))}
                <LeftTwitterBlue />
                <LeftNavLink
                  href={`/user/${user.username}`}
                  username={user.username}
                  linkName="Profile"
                  iconName="UserIcon"
                  canBeHidden={true}
                  disabled={true}
                  showModal={showModal}
                />
              </>
            )}
            {user && <LeftMore />}
            {!user && !isMobile && (
              <>
                <LeftNavLink
                  {...navLinks.find(
                    (navLinks) => navLinks.href === "/explore"
                  )!}
                  showModal={showModal}
                />
                <LeftNavLink
                  href={"/settings/account/personalization"}
                  linkName="Settings"
                  iconName="Cog8ToothIcon"
                  showModal={showModal}
                />
              </>
            )}
          </nav>
          {user && (
            <Button
              type="button"
              className={cn(
                "group text-white bg-main-accent xs:hover:bg-main-accent/90 xs:active:bg-main-accent/75 absolute xs:static right-4 -translate-y-[88px] xs:translate-y-0 hover:brightness-95 active:brightness-85 p-4 xs:p-3 text-lg font-bold xl:w-11/12 !ring-0 after:absolute after:inset-0 after:[box-shadow:#00000014_0px_8px_28px] after:focus-visible:!ring-2 after:focus-visible:!ring-main-accent after:focus-visible:!contrast-75 after:focus-visible:!brightness-125 after:rounded-full after:transition-shadow after:focus-visible:animate-translateY1px",
                windowHeight > 700 && "xs:mt-4"
              )}
              onClick={() => {
                console.log("TEST");
              }}
            >
              <ToolTip
                tip={"Tweet"}
                className="hidden xs:inline xl:hidden translate-y-[200%] !opacity-75"
              />
              <CustomIcon
                className="block h-6 w-6 xl:hidden"
                iconName="FeatherIcon"
              />
              <span className="hidden xl:inline">Tweet</span>
            </Button>
          )}
        </section>
      </div>
      {user && <LeftProfile />}
    </header>
  );
};

export default Left;
