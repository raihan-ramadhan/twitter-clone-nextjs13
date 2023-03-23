import cn from "clsx";
import Link from "next/link";
import { CustomIcon } from "../ui/custom-icons";
import { LeftMore } from "./left-more";
import { LeftNavLink } from "./left-nav-link";
import type { IconName } from "../ui/hero-icon";

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
  return (
    <header className={cn("flex shrink-0 w-0", widthCN)}>
      <div
        className={cn(
          "fixed bg-white xs:top-0 xs:bottom-0 left-0 xs:left-[unset] right-0 xs:right-[unset] bottom-0 px-2",
          widthCN
        )}
      >
        <div className="flex flex-col items-center xl:items-start">
          <h1 className="hidden xs:flex pt-[2px]">
            <Link
              href={"/home"}
              className="p-3 hover:bg-[#00acee]/10 text-[#00acee] hover-animation focus-visible:bg-[#00acee]/10 focus-visible:ring focus-visible:!ring-blue-500/80 rounded-full focus:outline-none"
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
        </div>
      </div>
    </header>
  );
};

export default Left;
