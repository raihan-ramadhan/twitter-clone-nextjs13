import { useAuth } from "@/lib/context/auth-context";
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
  return (
    <>
      {!user && <RightWithoutUser />}
      {user && <RightWithUser {...{ ...props }} />}

      <nav
        aria-label="Footer"
        role="navigation"
        className="text-sm leading-relaxed p-3 [&>a]:span-link-secondary text-light-secondary dark:text-dark-secondary [&>*]:mr-3 [&>*]:inline-block"
      >
        {linksNav.map(({ href, text }, index) => (
          <a key={`link_nav_${index}`} href={href} target="_blank">
            {text}
          </a>
        ))}
        <RightMore />
        <span>© 2023 Twitter Clone.</span>
      </nav>
    </>
  );
};
