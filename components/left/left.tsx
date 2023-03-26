"use client";
import cn from "clsx";
import Link from "next/link";
import { CustomIcon } from "../ui/custom-icons";
import { LeftMore } from "./left-more";
import { LeftNavLink } from "./left-nav-link";
import { IconName } from "../ui/hero-icon";
import { LeftProfil } from "./left-profil";
import { Button } from "../ui/button";
import { useWindow } from "@/lib/context/window-context";

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
    disabled: true,
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
    href: "/bookmarks",
    linkName: "Bookmarks",
    iconName: "BookmarkIcon",
    canBeHidden: true,
    disabled: true,
  },
  {
    href: "/lists",
    linkName: "Lists",
    iconName: "Bars3BottomLeftIcon",
    disabled: true,
    canBeHidden: true,
  },
];

const Left = (): JSX.Element => {
  const widthCN = "xs:w-20 md:w-24 xl:w-full xl:max-w-[275px]";

  const { isMobile } = useWindow();

  return (
    <header
      className={cn("flex flex-col justify-between shrink-0 w-0", widthCN)}
    >
      <div
        className={cn(
          "fixed flex flex-col justify-between xs:top-0 xs:bottom-0 left-0 xs:left-[unset] right-0 xs:right-[unset] bottom-0 px-2",
          widthCN
        )}
      >
        <div className="flex flex-col justify-between">
          <section className="flex flex-col items-center xl:items-start">
            <h1 className="hidden xs:flex pt-[2px]">
              <Link
                href={"/home"}
                className="custom-button text-accent-blue dark:text-twitter-icon transition focus-visible:bg-accent-blue/10 hover:bg-main-accent/10 outline-none focus-visible:ring-2 focus-visible:ring-[#8ecdf8] "
              >
                <CustomIcon className="w-7 h-7" iconName="TwitterIcon" />
              </Link>
            </h1>
            <nav className="flex xs:flex-col my-1 flex-row w-full">
              {navLinks.map(({ ...linkData }) => (
                <LeftNavLink {...linkData} key={linkData.href} />
              ))}
              <LeftNavLink
                href={`/user/raihan`}
                username="raihan"
                linkName="Profile"
                iconName="UserIcon"
                canBeHidden={true}
                disabled={true}
              />
              {!isMobile && <LeftMore />}
            </nav>
            <Button
              type="button"
              className="text-white bg-main-accent xs:hover:bg-main-accent/90 xs:active:bg-main-accent/75 absolute xs:static right-4 -translate-y-[88px] xs:translate-y-0 hover:brightness-95 active:brightness-85 p-4 xs:p-3 mt-4 text-lg font-bold xl:w-11/12 !ring-0 after:absolute after:inset-0 after:[box-shadow:#00000014_0px_8px_28px] after:focus-visible:!ring-2 after:focus-visible:!ring-[#8ecdf8] after:rounded-full after:transition-shadow after:focus-visible:animate-translateY1px"
              onClick={() => {
                console.log("TEST");
              }}
            >
              <CustomIcon
                className="block h-6 w-6 xl:hidden"
                iconName="FeatherIcon"
              />
              <span className="hidden xl:inline">Tweet</span>
            </Button>
          </section>
        </div>
        <LeftProfil />
      </div>
    </header>
  );
};

export default Left;
