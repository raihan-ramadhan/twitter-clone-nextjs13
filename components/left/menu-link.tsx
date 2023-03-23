import { forwardRef } from "react";
import Link from "next/link";
import type { ComponentPropsWithRef } from "react";
import cn from "clsx";

type MenuLinkProps = ComponentPropsWithRef<"a"> & {
  href: string;
  disabled?: boolean;
  classLink: string;
};

// eslint-disable-next-line react/display-name
export const MenuLink = forwardRef<HTMLAnchorElement, MenuLinkProps>(
  ({ children, classLink, disabled = false, href, ...rest }, ref) => (
    <Link
      className={cn(
        "duration-200 p-4 flex w-full gap-5",
        classLink,
        disabled && "cursor-not-allowed"
      )}
      {...rest}
      href={disabled ? "javascript:;" : href}
      ref={ref}
    >
      {children}
    </Link>
  )
);
