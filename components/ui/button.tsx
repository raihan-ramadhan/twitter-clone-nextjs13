"use client";
import { forwardRef } from "react";
import cn from "clsx";
import type { ComponentPropsWithRef } from "react";

type ButtonProps = ComponentPropsWithRef<"button">;

// eslint-disable-next-line react/display-name
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, disabled, children, ...rest }, ref) => {
    //eslint-disable-line
    return (
      <button className={cn(className)} type="button" ref={ref} {...rest}>
        {children}
      </button>
    );
  }
);
