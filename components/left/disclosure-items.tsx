import { DisclosureItem } from "./disclosure";

export const DisclosureItems = ({
  openModal,
  closeMenu,
}: {
  openModal?: () => void;
  closeMenu?: () => void;
}) => {
  return (
    <>
      <DisclosureItem
        textButton="Creator Studio"
        linksPanel={[
          {
            elem: "a",
            text: "Analytics",
            href: "https://analytics.twitter.com/",
            icon: "ChartBarSquareIcon",
          },
        ]}
      />
      <DisclosureItem
        textButton="Professional Tools"
        linksPanel={[
          {
            elem: "button",
            text: "Twitter for Professional",
            icon: "RocketLaunchIcon",
            func: () => {
              console.log("TEST");
            },
          },
          {
            elem: "a",
            text: "Twitter Ads",
            href: "https://ads.twitter.com/?ref=gl-tw-tw-twitter-ads-rweb",
            icon: "ArrowTopRightOnSquareIcon",
          },
          {
            elem: "link",
            text: "Monetization",
            href: "/settings/monetization",
            icon: "BanknotesIcon",
            disabled: true,
          },
        ]}
      />
      <DisclosureItem
        textButton="Settings and Support"
        linksPanel={[
          {
            elem: "link",
            text: "Settings and privacy",
            href: "/settings",
            icon: "Cog8ToothIcon",
            disabled: true,
          },
          {
            elem: "a",
            text: "Help Center",
            href: "https://help.twitter.com",
            icon: "QuestionMarkCircleIcon",
          },
          {
            elem: "button",
            text: "Display",
            func: () => {
              if (openModal) openModal();
              if (closeMenu) closeMenu();
            },
            icon: "PaintBrushIcon",
          },
        ]}
      />
    </>
  );
};
