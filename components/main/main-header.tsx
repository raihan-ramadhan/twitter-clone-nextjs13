"use client";
import cn from "clsx";
import { Button } from "@/components/ui/button";
import { HeroIcon } from "@/components/ui/hero-icon";
import { ToolTip } from "@/components/ui/tooltip";
import type { ReactNode } from "react";
import type { IconName } from "@/components/ui/hero-icon";
import { MobileLeft } from "../left/mobile-left";
import { useWindow } from "@/lib/context/window-context";
import { ExploreSettingsModal } from "../modal/left/explore-settings";

type HomeHeaderProps = {
  tip?: string;
  title?: string;
  changeTitleOnMobile?: JSX.Element;
  children?: ReactNode;
  iconName?: IconName;
  className?: string;
  position?: "sticky" | "notStickyOnMobile" | "notSticky";
  useActionButton?: boolean;
  useMobileSidebar?: boolean;
  action?: () => void;
  disabledBlurBG?: boolean;
  useExploreSettingsButton?: boolean;
  titleClassName?: string;
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
}: HomeHeaderProps): JSX.Element {
  const { isMobile } = useWindow();

  return (
    <div
      className={cn(
        "hover-animation z-10 px-4 py-2 min-h-[50px]",
        position == "sticky" && "sticky top-0",
        position == "notStickyOnMobile" && "xs:sticky xs:top-0",
        position == "notSticky" && "relative",
        disabledBlurBG ? "bg-main-background-1" : "blur-background",
        className ?? "flex items-center gap-6"
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
