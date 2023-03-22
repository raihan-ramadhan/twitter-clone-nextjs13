import { Menu } from "@headlessui/react";
import { HeroIcon } from "../ui/hero-icon";
import { MenuLink } from "./left-menu-link";

import cn from "clsx";

export const LeftMenuItems = ({
  myOverlay,
  setMyOverlay,
}: {
  myOverlay: string;
  setMyOverlay: Function;
}): JSX.Element => {
  return (
    <>
      <Menu.Item>
        {({ active }): JSX.Element => (
          <MenuLink
            classLink={cn(
              "flex w-full gap-5 p-4 duration-200",
              active && "bg-black/5"
            )}
            href="/raihan/topics"
            disabled={true}
          >
            <HeroIcon iconName="ChatBubbleOvalLeftEllipsisIcon" />
            Topics
          </MenuLink>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }): JSX.Element => (
          <MenuLink
            classLink={cn("", active && "bg-black/5")}
            href="/raihan/lists"
            disabled={true}
          >
            <HeroIcon iconName="QueueListIcon" />
            Lists
          </MenuLink>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }): JSX.Element => (
          <MenuLink
            classLink={cn(active && "bg-black/5")}
            href="/i/circles"
            disabled={true}
          >
            <HeroIcon iconName="UsersIcon" />
            Twitter Circle
          </MenuLink>
        )}
      </Menu.Item>
    </>
  );
};
