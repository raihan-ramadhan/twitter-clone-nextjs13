import { usePathname } from "next/navigation";
import Link from "next/link";
import type { NavLink } from "./left";
import { HeroIcon } from "../ui/hero-icon";
import cn from "clsx";

type SidebarLinkProps = NavLink & {
  username?: string;
};

export const LeftNavLink = (props: SidebarLinkProps): JSX.Element => {
  const { href, disabled, canBeHidden, iconName, linkName } = props;
  const asPathname = usePathname();

  const isActive = href === asPathname;

  const theClassName = cn(
    "group flex-1 py-1 outline-none",
    canBeHidden ? "hidden xs:flex" : "flex",
    disabled && "cursor-not-allowed"
  );

  return (
    <Link href={href} className={theClassName}>
      <div className="w-full flex justify-center xl:justify-start">
        <div
          className="flex items-center gap-5 custom-button xl:pr-6 group-hover:bg-light-primary/10 group-focus-visible:ring-2 
             group-focus-visible:ring-[#878a8c] dark:group-hover:bg-dark-primary/10 
             dark:group-focus-visible:ring-white"
        >
          <HeroIcon
            className={cn(
              "h-7 w-7",
              isActive &&
                ["Explore", "Lists"].includes(linkName) &&
                "stroke-inherit"
            )}
            iconName={iconName}
            solid={isActive}
          />
          <span className="hidden xl:inline text-xl">{linkName}</span>
        </div>
      </div>
    </Link>
  );
};
