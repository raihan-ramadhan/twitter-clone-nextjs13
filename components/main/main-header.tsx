"use client";
import cn from "clsx";
import { useRef, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ToolTip } from "@/components/ui/tooltip";
import { HeroIcon } from "@/components/ui/hero-icon";
import { useWindow } from "@/lib/context/window-context";
import { MobileLeft } from "../left/mobile-left";
import { ExploreSettingsModal } from "../modal/left/explore-settings";

import type { ReactNode } from "react";
import type { IconName } from "@/components/ui/hero-icon";

type HomeHeaderProps = {
  tip?: string;
  title?: string;
  changeTitleOnMobile?: JSX.Element;
  children?: ReactNode;
  iconName?: IconName;
  className?: string;
  position?: "sticky" | "notSticky";
  useActionButton?: boolean;
  useMobileSidebar?: boolean;
  action?: () => void;
  disabledBlurBG?: boolean;
  useExploreSettingsButton?: boolean;
  titleClassName?: string;
  hideOnScrollDown?: boolean;
};

export function MainHeader({
  tip,
  title,
  children,
  iconName,
  className,
  position = "sticky",
  useActionButton,
  useMobileSidebar,
  action,
  changeTitleOnMobile,
  disabledBlurBG,
  useExploreSettingsButton,
  titleClassName,
  hideOnScrollDown,
}: HomeHeaderProps): JSX.Element {
  const [hideMainHeader, setHideMainHeader] = useState<boolean>(false);

  const divRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);

  const { isMobile } = useWindow();

  const handleScroll = () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;

    if (st > lastScrollTop.current) {
      // downscroll code
      setHideMainHeader(true);
    } else if (st < lastScrollTop.current) {
      // upscroll code
      setHideMainHeader(false);
    } // else was horizontal scroll

    lastScrollTop.current = st <= 0 ? 0 : st;
  };

  useEffect(() => {
    if (hideOnScrollDown) window.addEventListener("scroll", handleScroll);

    return () => {
      if (hideOnScrollDown) window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={divRef}
      className={cn(
        "hover-animation z-10 px-4 py-2 min-h-[50px] transition-transform duration-500",
        position == "sticky" && "sticky top-0",
        position == "notSticky" && "relative",
        disabledBlurBG ? "bg-main-background-1" : "blur-background",
        className ?? "flex items-center gap-6",
        hideMainHeader && hideOnScrollDown && isMobile && "-translate-y-full"
      )}
    >
      {useActionButton && (
        <Button
          className="dark-bg-tab group relative p-2 hover:bg-light-primary/10 active:bg-light-primary/20 
                     dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20"
          onClick={action}
        >
          <HeroIcon
            className="h-5 w-5"
            iconName={iconName ?? "ArrowLeftIcon"}
          />
          <ToolTip tip={tip ?? "Back"} />
        </Button>
      )}
      {(title || useMobileSidebar) && (
        <div className="flex gap-8 items-center">
          {useMobileSidebar && <MobileLeft />}
          <h2 className={cn("font-bold", titleClassName ?? "text-xl")}>
            {changeTitleOnMobile && isMobile ? changeTitleOnMobile : title}
          </h2>
        </div>
      )}
      {children}
      {useExploreSettingsButton && <ExploreSettingsModal />}
    </div>
  );
}
