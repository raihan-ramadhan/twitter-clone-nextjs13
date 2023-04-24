"use client";
import cn from "clsx";

import React, {
  useRef,
  useState,
  forwardRef,
  useCallback,
  useLayoutEffect,
} from "react";

import type { ComponentPropsWithRef, ReactNode } from "react";

type ChildrenProps = {
  isScrollable: boolean;
  refComponent: React.RefObject<HTMLDivElement>;
  opacityA: number;
  opacityB: number;
};

type ContainerScrollShadowsProps = Omit<
  ComponentPropsWithRef<"div">,
  "children"
> & {
  children: ((props: ChildrenProps) => JSX.Element) | ReactNode | ReactNode[];
  gradient?: "ellipse" | "normal";
  behaviour?: "default" | "smooth";
  classNameContainer: string;
  classnameShadows?: string;
  scrollbarHide?: boolean;
  direction?: "x" | "y";
  shadowThickness?: number;
};

export const ContainerScrollShadows = forwardRef<
  HTMLDivElement,
  ContainerScrollShadowsProps
>(
  (
    {
      shadowThickness = 0.15,
      gradient = "normal",
      direction = "y",
      classNameContainer,
      classnameShadows,
      scrollbarHide,
      className,
      behaviour,
      children,
      ...rest
    },
    ref
  ) => {
    const [scrollDimension, setScrollDimension] = useState<number | null>(null);
    const [clientDimension, setClientDimension] = useState<number | null>(null);
    const [opacityState, setOpacityState] = useState<number | null>(null);

    const opacityA = typeof opacityState !== "number" ? 0 : opacityState;
    const opacityB = typeof opacityState !== "number" ? 0 : 1 - opacityState;
    const refComponent = useRef<HTMLDivElement>(null);
    const isScrollable = scrollDimension !== clientDimension;

    const onScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
      const {
        scrollLeft,
        clientWidth,
        scrollWidth,
        scrollTop,
        clientHeight,
        scrollHeight,
      } = event.currentTarget;
      if (direction === "x") {
        setOpacityState(scrollLeft / (scrollWidth - clientWidth));
      } else {
        setOpacityState(scrollTop / (scrollHeight - clientHeight));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useLayoutEffect(() => {
      const el = refComponent.current;
      if (el) {
        if (direction === "x") {
          setOpacityState(el.scrollLeft / (el.scrollWidth - el.clientWidth));
          setScrollDimension(el.scrollWidth);
          setClientDimension(el.clientWidth);
        } else {
          setOpacityState(el.scrollTop / (el.scrollHeight - el.clientHeight));
          setScrollDimension(el.scrollHeight);
          setClientDimension(el.clientHeight);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div className={cn(classNameContainer)}>
        <div
          ref={refComponent}
          onScroll={onScroll}
          className={cn(
            `scrollbar-w-1 scrollbar-thumb-accent-blue hover:scrollbar-thumb-accent-blue/80 scrollbar-track-main-background-3 scrollbar-thin ${
              behaviour == "smooth" ? "scroll-smooth" : "scroll-auto"
            } ${direction == "x" ? "overflow-x-auto" : "overflow-y-auto"}`,
            className,
            scrollbarHide && "scrollbar-hide"
          )}
          {...rest}
        >
          {typeof children === "function"
            ? children({ isScrollable, refComponent, opacityA, opacityB })
            : children}
        </div>
        {isScrollable && (
          <div style={{ opacity: shadowThickness }}>
            <div
              className={cn(
                `z-10 absolute pointer-events-none ${
                  direction == "x"
                    ? "left-0 top-0 w-5 h-full"
                    : "top-0 h-5 w-full"
                }`,
                gradient == "normal" &&
                  "from-black dark:from-white to-transparent",
                direction == "x"
                  ? gradient == "normal"
                    ? "bg-gradient-to-r"
                    : "bg-gradient-radial-to-r"
                  : "",
                direction == "y"
                  ? gradient == "normal"
                    ? "bg-gradient-to-b"
                    : "bg-gradient-radial-to-b"
                  : "",
                classnameShadows
              )}
              style={{
                opacity: opacityA,
              }}
            />
            <div
              className={cn(
                `z-10 absolute pointer-events-none ${
                  direction == "x"
                    ? "right-0 top-0 w-5 h-full"
                    : "bottom-0 h-5 w-full"
                }`,
                gradient == "normal" &&
                  "from-black dark:from-white to-transparent",
                direction == "x"
                  ? gradient == "normal"
                    ? "bg-gradient-to-l"
                    : "bg-gradient-radial-to-l"
                  : "",
                direction == "y"
                  ? gradient == "normal"
                    ? "bg-gradient-to-t"
                    : "bg-gradient-radial-to-t"
                  : "",
                classnameShadows
              )}
              style={{ opacity: opacityB }}
            />
          </div>
        )}
      </div>
    );
  }
);

ContainerScrollShadows.displayName = "MyContainerScrollShadowsComponent";
