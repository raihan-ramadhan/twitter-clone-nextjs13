import { useEffect, useRef, useState } from "react";

import { useAuth } from "@/lib/context/auth-context";
import { useWindow } from "@/lib/context/window-context";
import { RightMore } from "./right-more";
import { RightWithUser } from "./right-with-user";
import { RightWithoutUser } from "./right-without-user";

import type { RightProps } from "../layouts/common-layout";

const linksNav: { href: string; text: string }[] = [
  {
    href: "https://twitter.com/en/tos",
    text: "Terms of Service",
  },
  {
    href: "https://twitter.com/en/privacy",
    text: "Privacy Policy",
  },
  {
    href: "https://help.twitter.com/en/rules-and-policies/twitter-cookies",
    text: "Cookie Policy",
  },
  {
    href: "https://help.twitter.com/en/resources/accessibility",
    text: "Accessibility",
  },
  {
    href: "https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=adsinfo",
    text: "Ads info",
  },
];

export const Right = (props: RightProps) => {
  const { user } = useAuth();

  const { height: windowHeight } = useWindow();

  const [top, setTop] = useState<number | null>(null);
  const [bottom, setBottom] = useState<number | null>(null);
  const [marginTop, setMarginTop] = useState<number | null>(null);

  const setMarginRef = useRef<boolean>(false);

  const lastScrollTop = useRef(0);
  const rightRef = useRef<HTMLDivElement>(null);
  const windowHeightRef = useRef<number>(windowHeight);

  const handleScroll = () => {
    if (rightRef.current) {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      const rightHeight = rightRef.current.scrollHeight;
      const pageHeight = document.documentElement.scrollHeight;

      windowHeightRef.current = window.innerHeight;

      if (rightHeight > windowHeightRef.current) {
        const condtionViewPassRight =
          rightHeight < lastScrollTop.current + windowHeightRef.current;

        if (st > lastScrollTop.current) {
          // downscroll code
          setTop(
            pageHeight - (pageHeight - rightHeight + windowHeightRef.current)
          );
          setBottom(null);
          if (!condtionViewPassRight) {
            setMarginTop(1);
          } else if (condtionViewPassRight && setMarginRef.current) {
            setMarginTop(lastScrollTop.current);
          }
          setMarginRef.current = false;
        } else if (st < lastScrollTop.current) {
          // upscroll code
          setTop(null);
          setBottom(rightHeight - windowHeight);
          if (condtionViewPassRight && !setMarginRef.current) {
            setMarginTop(
              lastScrollTop.current + windowHeightRef.current - rightHeight
            );
            setMarginRef.current = true;
          }
        }
      }

      lastScrollTop.current = st <= 0 ? 0 : st;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowHeight]);

  return (
    <>
      <div
        className="bg-green-500/50 h-0"
        style={{
          marginTop: marginTop ? marginTop : undefined,
        }}
      />
      <div
        ref={rightRef}
        className="sticky"
        style={{
          top: top ? -top : !top && !bottom && !marginTop ? 0 : undefined,
          bottom: bottom ? -bottom : undefined,
        }}
      >
        {!user && <RightWithoutUser />}
        {user && <RightWithUser {...{ ...props }} />}

        <nav
          aria-label="Footer"
          role="navigation"
          className="text-sm pb-[100px] leading-relaxed p-3 [&>a]:span-link-secondary text-light-secondary dark:text-dark-secondary [&>*]:mr-3 [&>*]:inline-block"
        >
          {linksNav.map(({ href, text }, index) => (
            <a key={`link_nav_${index}`} href={href} target="_blank">
              {text}
            </a>
          ))}
          <RightMore />
          <span>© 2023 Twitter Clone.</span>
        </nav>
      </div>
    </>
  );
};
