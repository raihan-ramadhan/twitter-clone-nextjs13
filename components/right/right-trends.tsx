import cn from "clsx";
import Link from "next/link";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import { HeroIcon } from "../ui/hero-icon";
import { numberToAbbreviation } from "@/lib/utils";

const dummyTrends: { desc: string; title: string; totalTweet?: number }[] = [
  {
    desc: "Trending in Indonesia",
    title: "Rasis",
    totalTweet: 13400,
  },
  {
    desc: "Trending in Indonesia",
    title: "SMAN 3",
    totalTweet: 1683,
  },

  {
    desc: "Trending",
    title: "#HARAM",
    totalTweet: 17700,
  },
  {
    desc: "Trending",
    title: "Laravel",
    totalTweet: 1161,
  },
  {
    desc: "Trending in Indonesia",
    title: "Jokowisme",
    totalTweet: 1797,
  },
  {
    desc: "Politics · Trending",
    title: "MAGA",
    totalTweet: 147000,
  },
  {
    desc: "Trending",
    title: "Sasha",
    totalTweet: 39000,
  },
  {
    desc: "Trending in Indonesia",
    title: "Hanan Attaki",
    totalTweet: 11100,
  },
  {
    desc: "Traditional banks · Trending",
    title: "#TabunganBRI",
  },
];

export const RightTrends = () => {
  return (
    <section
      role="region"
      aria-labelledby="accesible-list-trends"
      className="rounded-2xl bg-main-background-3 m-3"
    >
      <h2
        id="accesible-list-trends"
        role="heading"
        className="text-xl leading-none font-bold p-3 block"
      >
        Trends for you
      </h2>
      {dummyTrends.map((trend, index) => {
        return (
          <div
            tabIndex={0}
            key={`trend_${index}`}
            className="flex w-full accent-tab hover-animation cursor-pointer px-4 py-3 hover:bg-light-primary/5 dark:hover:bg-dark-primary/5 min-h-[76px] relative text-light-secondary dark:text-dark-secondary focus-visible:bg-light-primary/5 focus-visble:dark:hover:bg-dark-primary/5 ring-inset"
          >
            <div className="flex flex-col flex-1">
              <span className="leading-none text-sm">{trend.desc}</span>
              <span className="font-semibold text-light-primary dark:text-dark-primary">
                {trend.title}
              </span>
              {trend.totalTweet && (
                <span className="leading-none text-sm">
                  {numberToAbbreviation(trend.totalTweet)}
                </span>
              )}
            </div>

            <Menu as="div" className="relative block outline-none">
              <Menu.Button
                as="button"
                className="hover:bg-accent-blue/10 hover:text-accent-blue hover-animation rounded-full p-1 outline-none focus-visible:bg-accent-blue/10 focus-visible:text-accent-blue focus-visible:ring-[2px] focus-visible:ring-accent-blue"
              >
                <HeroIcon iconName="EllipsisHorizontalIcon" />
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
                <Menu.Items
                  className={cn(
                    "absolute top-0 right-0 w-72 menu-container text-light-primary dark:text-dark-primary font-semibold"
                  )}
                >
                  <Menu.Item>
                    {({ active }) => (
                      <div className="relative">
                        <span
                          className={cn(
                            "flex items-center p-2 gap-2 ",
                            active &&
                              "bg-main-background-3 rounded-t-xl ring-2 ring-main-accent/80 transition-shadow duration-200 dark:ring-white ring-inset"
                          )}
                        >
                          <HeroIcon
                            iconName="FaceFrownIcon"
                            className="h-4 w-4"
                          />
                          <span role="heading">Not interested in this</span>
                        </span>
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div className="relative">
                        <span
                          className={cn(
                            "flex items-center p-2 gap-2",
                            active &&
                              "bg-main-background-3 rounded-b-xl ring-2 ring-main-accent/80 transition-shadow duration-200 dark:ring-white ring-inset"
                          )}
                        >
                          <HeroIcon
                            iconName="FaceFrownIcon"
                            className="h-4 w-4"
                          />
                          This trend is harmfull or spammy
                        </span>
                      </div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        );
      })}
      <Link
        href="/i/trends"
        className="custom-button accent-tab hover-card block w-full rounded-2xl rounded-t-none text-left text-main-accent"
      >
        Show more
      </Link>
    </section>
  );
};
