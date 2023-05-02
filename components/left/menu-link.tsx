import cn from "clsx";
import Link from "next/link";
import { forwardRef } from "react";

import { preventBubbling } from "@/lib/utils";

import type { ComponentPropsWithRef } from "react";

type MenuLinkProps = ComponentPropsWithRef<"a"> & {
  href: string;
  disabledMenu?: boolean;
};

// eslint-disable-next-line react/display-name
export const MenuLink = forwardRef<HTMLAnchorElement, MenuLinkProps>(
  ({ children, className, disabledMenu = false, href, ...rest }, ref) => (
    <Link
      href={href}
      legacyBehavior
      prefetch={disabledMenu ? false : undefined}
    >
      <a
        className={cn(
          "duration-200 p-4 flex w-full gap-5",
          disabledMenu && "cursor-not-allowed",
          className
        )}
        ref={ref}
        role={"link"}
        {...rest}
        onClick={disabledMenu ? preventBubbling() : undefined}
      >
        {children}
      </a>
    </Link>
  )
);
