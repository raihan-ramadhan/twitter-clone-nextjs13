import cn from "clsx";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useWindow } from "@/lib/context/window-context";

const moreItems: { title: string; href: string }[] = [
  {
    title: "About",
    href: "https://about.twitter.com/en",
  },
  {
    title: "Status",
    href: "https://status.twitterstat.us/",
  },
  {
    title: "Twitter for Business",
    href: "https://business.twitter.com/?ref=web-twc-ao-gbl-twitterforbusiness&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=twitterforbusiness",
  },
  {
    title: "Developer",
    href: "https://developer.twitter.com/en",
  },
];

export function RightMore() {
  const { height: windowHeight } = useWindow();
  const windowHeightRef = useRef<number>(windowHeight);
  const menuButtonRef = useRef<HTMLDivElement>(null);
  const [dropDown, setDropDown] = useState<boolean>(true);

  const handleClick = () => {
    setTimeout(() => {
      if (menuButtonRef.current) {
        setDropDown(
          windowHeightRef.current -
            menuButtonRef.current.getBoundingClientRect().bottom >
            menuButtonRef.current.scrollHeight -
              menuButtonRef.current.clientHeight +
              10
        );
      }
    }, 10);

    windowHeightRef.current = windowHeight;
  };

  const handleScroll = () => {
    if (menuButtonRef.current) {
      setDropDown(
        windowHeightRef.current -
          menuButtonRef.current.getBoundingClientRect().bottom >
          menuButtonRef.current.scrollHeight -
            menuButtonRef.current.clientHeight +
            10
      );
      windowHeightRef.current = windowHeight;
    }
  };

  useEffect(() => {
    const ref = menuButtonRef.current;

    if (ref) window.addEventListener("scroll", handleScroll);

    return () => {
      if (ref) window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuButtonRef.current, windowHeight]);

  return (
    <Menu as="div" ref={menuButtonRef} className="relative inline-block">
      {({ open, close }): JSX.Element => {
        return (
          <>
            <Menu.Button
              onClick={handleClick}
              as="button"
              className="text-sm span-link-secondary"
            >
              More...
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <div className="absolute right-0 top-0 origin-top-right w-44">
                <Menu.Items
                  className={cn(
                    "menu-container text-light-primary dark:text-dark-primary",
                    !dropDown && "-translate-y-[calc(100%_-_22px)]"
                  )}
                >
                  {moreItems.map(({ href, title }, index) => {
                    return (
                      <Menu.Item key={`right_more_${index}`}>
                        {({ active }) => (
                          <a
                            // role="menuitem"
                            href={href}
                            target="_blank"
                            className={cn(
                              `px-4 py-3 text-sm font-semibold transition-[colors_shadow] !block`,
                              active &&
                                "ring-2 ring-main-accent bg-main-background-3",
                              index == 0 && "rounded-t-2xl",
                              index == moreItems.length - 1 && "rounded-b-2xl"
                            )}
                          >
                            {title}
                          </a>
                        )}
                      </Menu.Item>
                    );
                  })}
                </Menu.Items>
              </div>
            </Transition>
          </>
        );
      }}
    </Menu>
  );
}
