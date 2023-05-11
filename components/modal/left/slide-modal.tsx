import cn from "clsx";
import Link from "next/link";
import { Variants } from "framer-motion";

import { Modal } from "../modal";
import { HrLine } from "@/components/ui/hr-line";
import { HeroIcon } from "@/components/ui/hero-icon";
import { UserName } from "@/components/user/user-name";
import { MenuLink } from "@/components/left/menu-link";
import { CustomIcon } from "@/components/ui/custom-icons";
import { UserAvatar } from "@/components/user/user-avatar";
import { MainHeader } from "@/components/main/main-header";
import { UserUsername } from "@/components/user/user-username";
import { DisclosureItem } from "@/components/left/disclosure";

import type { DisclosureLink } from "@/components/left/disclosure";
import type { IconName as HeroIconName } from "@/components/ui/hero-icon";
import type { IconName as CustomIconName } from "@/components/ui/custom-icons";
import type {
  MobileLeftModals,
  MobileSidebarModalProps,
} from "./mobile-left-modal";
import { Button } from "@/components/ui/button";

type Stats = [string, string, number];

type SlideModalProps = Omit<MobileSidebarModalProps, "handleOpenSlideLeft"> & {
  handleOpenModal: (prop: MobileLeftModals) => void;
};

type SlidesNavProps = {
  elem: "menu" | "button";
  title: string;
  icon: HeroIconName | CustomIconName;
  href?: string;
  func?: () => void;
  disabled?: boolean;
};

type SlidesDisclosureProps = {
  title: string;
  panels: DisclosureLink[];
};

const leftToRightVariant: Variants = {
  initial: { x: "-100%" },
  animate: {
    x: -8,
    transition: { type: "spring", duration: 0.8 },
  },
  exit: { x: "-100%", transition: { duration: 0.4 } },
};

export const SlideModal = ({
  username,
  photoURL,
  name,
  verified,
  following,
  followers,
  openSlideLeft,
  handleCloseSlideLeft,
  handleOpenModal,
}: SlideModalProps) => {
  const allStats: Readonly<Stats[]> = [
    ["following", "Following", following.length],
    ["followers", "Followers", followers.length],
  ];

  const slidesNav: SlidesNavProps[] = [
    {
      elem: "menu",
      title: "Profile",
      icon: "UserIcon",
      href: `user/${username}`,
      disabled: true,
    },
    {
      elem: "button",
      title: "Twitter Blue",
      icon: "TwitterBlueIcon",
      func: () => handleOpenModal("twitterBlue"),
    },
    {
      elem: "menu",
      title: "Lists",
      icon: "QueueListIcon",
      href: `${username}/lists`,
      disabled: true,
    },
    {
      elem: "menu",
      title: "Bookmarks",
      icon: "BookmarkIcon",
      href: `i/bookmarks`,
      disabled: true,
    },
    {
      elem: "button",
      title: "Verified Orgs",
      icon: "VerificationBadge",
      func: () => handleOpenModal("verifiedOrgs"),
    },
  ];

  const slidesDisclosure: SlidesDisclosureProps[] = [
    {
      title: "Creator Studio",
      panels: [
        {
          elem: "a",
          text: "Analytics",
          href: "https://analytics.twitter.com/",
          icon: "ChartBarSquareIcon",
        },
      ],
    },
    {
      title: "Professional Tools",
      panels: [
        {
          elem: "button",
          text: "Twitter for Professional",
          icon: "RocketLaunchIcon",
          func: () => {
            handleOpenModal("professional");
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
        },
      ],
    },
    {
      title: "Settings and Support",
      panels: [
        {
          elem: "link",
          text: "Settings and privacy",
          href: "/settings/account",
          icon: "Cog8ToothIcon",
        },
        {
          elem: "a",
          text: "Help Center",
          href: "https://help.twitter.com",
          icon: "QuestionMarkCircleIcon",
        },
        {
          elem: "link",
          text: "Data Saver",
          href: "/settings/data",
          icon: "ArrowDownCircleIcon",
        },
        {
          elem: "button",
          text: "Display",
          func: () => {
            handleOpenModal("display");
          },
          icon: "PaintBrushIcon",
        },
        {
          elem: "button",
          text: "Keyboard shortcuts",
          func: () => {
            handleOpenModal("keyboard");
          },
          icon: "AdjustmentsHorizontalIcon",
        },
        {
          elem: "button",
          text: "Logout",
          func: () => {
            handleOpenModal("logout");
          },
          icon: "ArrowLeftOnRectangleIcon",
        },
      ],
    },
  ];

  return (
    <Modal
      className="!p-0"
      modalAnimation={leftToRightVariant}
      modalClassName="pb-4 pl-2 h-screen overflow-y-auto w-72 bg-main-background-1"
      open={openSlideLeft}
      closeModal={handleCloseSlideLeft}
    >
      <MainHeader
        useActionButton
        disabledBlurBG
        className="flex flex-row-reverse justify-between "
        titleClassName="text-base xs:text-xl"
        iconName="XMarkIcon"
        title="Account info"
        tip="Close"
        action={handleCloseSlideLeft}
      />
      <section className="mt-2">
        <div className="flex flex-col gap-2 p-4">
          <div className="flex justify-between w-full">
            <UserAvatar
              className="bg-main-background hover:brightness-100 [&>figure>span]:[transition:200ms] [&:hover>figure>span]:brightness-75"
              username={username}
              src={photoURL}
              alt={name}
              size={40}
              tabIndex="-1"
            />
            <Button className="border border-light-border dark:border-dark-border flex justify-center items-center p-0 mx-1 h-7 w-7 dark-bg-tab hover:bg-light-primary/10 active:bg-light-primary/20 dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20">
              <HeroIcon
                iconName="PlusIcon"
                className="h-4 w-4 fill-light-primary dark:fill-dark-primary"
              />
            </Button>
          </div>
          <div>
            <UserName name={name} username={username} verified={verified} />
            <UserUsername username={username} tabIndex="-1" />
          </div>
          <div className="flex w-full gap-5">
            {allStats.map(([id, label, stat]) => (
              <Link
                href={`${username}/${id}`}
                key={id}
                className="hover-animation flex h-4 items-center gap-1 border-b border-b-transparent 
          outline-none hover:border-b-light-primary focus-visible:border-b-light-primary
          dark:hover:border-b-dark-primary dark:focus-visible:border-b-dark-primary text-sm"
              >
                <p className="font-bold">{stat}</p>
                <p className="text-light-secondary dark:text-dark-secondary">
                  {label}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center">
          {slidesNav.map((slide, index) => {
            if (slide.elem == "menu") {
              const iconName = slide.icon as HeroIconName;

              return (
                <MenuLink
                  key={`slide_nav_${index}`}
                  className={cn(
                    "flex items-center w-full gap-5 duration-200 relative hover:bg-main-background-3 outline-none text-xl after:absolute after:inset-0 after:h-full after:w-full focus-visible:after:border-2 focus-visible:after:border-main-accent"
                  )}
                  href={slide.href!}
                  disabledMenu={slide.disabled!}
                >
                  <HeroIcon iconName={iconName} />
                  <span className="font-semibold select-none">
                    {slide.title}
                  </span>
                </MenuLink>
              );
            } else if (slide.elem == "button") {
              const iconName = slide.icon as CustomIconName;

              return (
                <button
                  key={`slide_nav_${index}`}
                  type="button"
                  className={cn(
                    "relative duration-200 p-4 flex w-full gap-5 cursor-pointer hover:bg-main-background-3 text-xl outline-none after:absolute after:inset-0 after:h-full after:w-full focus-visible:after:border-2 focus-visible:after:border-main-accent"
                  )}
                  onClick={slide.func}
                >
                  <CustomIcon
                    iconName={iconName}
                    className={cn(
                      "h-6 w-6",
                      iconName == "TwitterBlueIcon" && "!fill-accent-blue"
                    )}
                    solid={iconName == "VerificationBadge" ? false : true}
                  />
                  <span className="font-semibold select-none">
                    {slide.title}
                  </span>
                </button>
              );
            }
          })}

          <HrLine className="mx-4" />

          {slidesDisclosure.map(({ panels, title }, index) => {
            return (
              <DisclosureItem
                key={`slide_disclosure${index}`}
                classDisc={cn(
                  "hover:bg-main-background-3 font-semibold outline-none after:absolute after:inset-0 after:h-full after:w-full focus-visible:after:border-2 focus-visible:after:border-main-accent"
                )}
                textButton={title}
                linksPanel={panels}
              />
            );
          })}
        </div>
      </section>
    </Modal>
  );
};
