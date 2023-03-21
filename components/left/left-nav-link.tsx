import Link from "next/link";
import type { NavLink } from "./left";
import { HeroIcon } from "../ui/hero-icon";
import cn from "clsx";

type SidebarLinkProps = NavLink & {
  username?: string;
};

const LeftNavLink = (props: SidebarLinkProps): JSX.Element => {
  const { href, disabled, canBeHidden } = props;

  const theClassName = cn(
    "group flex-1 py-1",
    canBeHidden ? "hidden xs:flex" : "flex",
    disabled && "cursor-not-allowed"
  );

  return disabled ? (
    <a className={theClassName} href="javascript://This-is-Disabled-Link;">
      {/*use javascript:; in href link to disabled event bubble and disabled the link*/}
      <ContentLink {...{ ...props }} />
    </a>
  ) : (
    <Link href={href} className={theClassName}>
      <ContentLink {...{ ...props }} />
    </Link>
  );
};

export default LeftNavLink;

const ContentLink = ({
  href,
  username,
  iconName,
  linkName,
  disabled,
  canBeHidden,
}: SidebarLinkProps): JSX.Element => {
  return (
    <div className="w-full flex justify-center xl:justify-start ">
      <div className="flex items-center gap-5 hover-animation group-hover:bg-black/10 rounded-full p-3">
        <HeroIcon className={"h-7 w-7"} iconName={iconName} />
        <span className="hidden xl:inline text-xl">{linkName}</span>
      </div>
    </div>
  );
};
