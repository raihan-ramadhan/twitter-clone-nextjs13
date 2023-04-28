import cn from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { HeroIcon } from "../ui/hero-icon";
import { preventBubbling } from "@/lib/utils";

import type { NavLink } from "./left";

type SidebarLinkProps = NavLink & {
  username?: string;
};

export const LeftNavLink = (props: SidebarLinkProps): JSX.Element => {
  const { href, disabled = false, canBeHidden, iconName, linkName } = props;
  const asPathname = usePathname();

  const isActive = href === asPathname;

  return (
    <Link href={href} legacyBehavior prefetch={!disabled}>
      <a className={cn("group flex-1 py-1 outline-none w-full flex justify-center xl:justify-start", 
          canBeHidden ? "hidden xs:flex" : "flex", 
          disabled && "cursor-not-allowed"
        )}
        onClick={disabled ? preventBubbling() : undefined}
      >
        <div
          className="flex items-center gap-5 custom-button xl:pr-6 group-hover:bg-light-primary/10 group-focus-visible:ring-2 
             group-focus-visible:ring-[#878a8c] dark:group-hover:bg-dark-primary/10 
             dark:group-focus-visible:ring-white"
        >
          <HeroIcon
            className={cn(
              "h-7 w-7",
              isActive &&
                ["Explore"].includes(linkName) &&
                "stroke-light-primary dark:stroke-dark-primary"
            )}
            iconName={iconName}
            solid={isActive}
          />
          <span className="hidden xl:inline text-xl">{linkName}</span>
        </div>
      </a>
    </Link>
  );
};
