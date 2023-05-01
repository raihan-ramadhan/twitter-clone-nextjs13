import cn from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { HeroIcon } from "../ui/hero-icon";
import { preventBubbling } from "@/lib/utils";

import type { NavLink } from "./left";

type SidebarLinkProps = NavLink & {
  username?: string;
  showModal?: boolean;
};

export const LeftNavLink = (props: SidebarLinkProps): JSX.Element => {
  const {
    href,
    iconName,
    linkName,
    canBeHidden,
    disabled = false,
    showModal,
  } = props;

  const asPathname = usePathname();

  const isActive = href === asPathname;

  return (
    <Link href={href} legacyBehavior prefetch={!disabled}>
      <a
        className={cn(
          "group flex-1 py-1 outline-none w-full flex justify-center xl:justify-start",
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
                !showModal &&
                "stroke-light-primary dark:stroke-dark-primary"
              // showmodal here make when modal showup the icon go back to regular, it's suppose to be use asPathname and the modal should use shallow router but due the unstable the shallow in Link next js 13 beta i'm just going use showModalContext for the meantime untill it get better
            )}
            iconName={iconName}
            solid={isActive && !showModal}
          />
          <span
            className={cn(
              `hidden xl:inline text-xl`,
              isActive && !showModal && "font-bold"
              // showmodal here make when modal showup the text go back to regular, it's suppose to be use asPathname and the modal should use shallow router but due the unstable the shallow in Link next js 13 beta i'm just going use showModalContext for the meantime untill it get better
            )}
          >
            {linkName}
          </span>
        </div>
      </a>
    </Link>
  );
};
