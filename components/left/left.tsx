"use client";
import cn from "clsx";
import Link from "next/link";
import { CustomIcon } from "../ui/custom-icons";
import { LeftMore } from "./left-more";
import { LeftNavLink } from "./left-nav-link";
import { IconName } from "../ui/hero-icon";
import { LeftProfil } from "./left-profil";
import { Button } from "../ui/button";

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
  const widthCN = "xs:w-20 md:w-24 xl:w-full xl:max-w-[275px] px-2";
  return (
    <header className={cn("flex shrink-0 w-0 ", widthCN)}>
      <div
        className={cn(
          "fixed bg-white xs:top-0 xs:bottom-0 left-0 xs:left-[unset] right-0 xs:right-[unset] bottom-0",
          widthCN
        )}
      >
        <section className="flex flex-col items-center xl:items-start">
          <h1 className="hidden xs:flex pt-[2px]">
            <Link
              href={"/home"}
              className="p-3 hover:bg-[#1D9BF0]/10 text-[#1D9BF0] hover-animation focus-visible:bg-[#1D9BF0]/10 focus-visible:ring focus-visible:!ring-blue-500/80 rounded-full focus:outline-none"
            >
              <CustomIcon className="w-7 h-7" iconName="TwitterIcon" />
            </Link>
          </h1>
          <nav className="flex xs:flex-col flex-row w-full">
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
            <LeftMore />
          </nav>
          <Button
            type="button"
            className="p-4 xs:p-3 mt-4 rounded-full absolute right-4 -translate-y-[88px] bg-[#1D9BF0] text-lg font-bold text-white
                       outline-none transition hover:bg-[#197fc4]  xs:static xs:translate-y-0
                       xs:hover:bg-[#197fc4]  xl:w-11/12"
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
        <LeftProfil />
      </div>
    </header>
  );
};

export default Left;
