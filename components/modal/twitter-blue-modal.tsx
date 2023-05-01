"use client";
import cn from "clsx";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Modal } from "./modal";
import { XModal } from "../ui/modal/x-modal";
import { HeroIcon } from "../ui/hero-icon";
import { useWindow } from "@/lib/context/window-context";
import { ButtonHighlight } from "../ui/modal/buttons-modal";

import type { Variants } from "framer-motion";
import type { IconName } from "../ui/hero-icon";

type OnChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => void;

const variants: Variants[] = [
  {
    initial: { height: 0, display: "none" },
    animate: {
      height: "auto",
      display: "block",
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      height: 0,
      transition: {
        height: 0.3,
      },
      transitionEnd: {
        display: "none",
      },
    },
  },
  {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.2,
        delay: 0.22,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0,
      },
    },
  },
];

const [variantHeight, variantOpacity] = variants;

export const TwitterBlueModal = ({
  closeModal,
}: {
  closeModal: () => void;
}): JSX.Element => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [twitterBlue, setTwitterBlue] = useState<"0" | "1">("0");

  const { isMobile } = useWindow();

  const onChange: OnChange = (event) => {
    const value = event.target.value as "0" | "1";
    setTwitterBlue(value);
  };

  return (
    <>
      {isMobile && (
        <Modal
          modalClassName="bg-main-background-1 w-full xs:h-[unset] relative rounded-t-[30px]"
          className={cn("flex items-end overflow-y-hidden", isMobile && "!p-0")}
          open={showMore}
          modalAnimation={variantHeight}
          closeModal={() => setShowMore(false)}
        >
          <LearnMoreModal />
        </Modal>
      )}
      <div className="h-full xs:min-h-[inherit] w-full flex flex-col rounded-2xl overflow-hidden relative">
        <XModal closeModal={closeModal} className="z-30" tabIndex={0} />
        <div className="xs:min-h-[inherit] xs:max-h-[calc(100vh_-_100px)] h-full overflow-y-auto w-full relative z-0 flex flex-col">
          <div className="text-light-primary dark:text-dark-primary bg-main-background-1/70 w-full inset-x-0 h-14 flex justify-center items-center shrink-0 sticky top-0 backdrop-blur-lg">
            <svg viewBox="0 0 76 24" className="h-6 fill-current">
              <g>
                <path d="M16.5 3H2v18h15c3.038 0 5.5-2.46 5.5-5.5 0-1.4-.524-2.68-1.385-3.65-.08-.09-.089-.22-.023-.32.574-.87.908-1.91.908-3.03C22 5.46 19.538 3 16.5 3zm-.796 5.99c.457-.05.892-.17 1.296-.35-.302.45-.684.84-1.125 1.15.004.1.006.19.006.29 0 2.94-2.269 6.32-6.421 6.32-1.274 0-2.46-.37-3.459-1 .177.02.357.03.539.03 1.057 0 2.03-.35 2.803-.95-.988-.02-1.821-.66-2.109-1.54.138.03.28.04.425.04.206 0 .405-.03.595-.08-1.033-.2-1.811-1.1-1.811-2.18v-.03c.305.17.652.27 1.023.28-.606-.4-1.004-1.08-1.004-1.85 0-.4.111-.78.305-1.11 1.113 1.34 2.775 2.22 4.652 2.32-.038-.17-.058-.33-.058-.51 0-1.23 1.01-2.22 2.256-2.22.649 0 1.235.27 1.647.7.514-.1.997-.28 1.433-.54-.168.52-.526.96-.992 1.23zm15.158 12.013H25.64V2.625h5.222v18.378zm10.35.482c-2.163 0-3.844-.54-5.044-1.622-1.183-1.082-1.775-2.62-1.775-4.614V8.33h5.222v5.626c0 1.37.33 2.366.99 2.99.658.627 1.57.94 2.737.94 1.436 0 2.535-.39 3.295-1.167.76-.795 1.14-1.8 1.14-3.017V8.33H53v12.673h-5.12v-2.89c-.56 1.1-1.43 1.936-2.612 2.51-1.183.575-2.535.862-4.056.862zm33.311-5.729H60.53c.186.794.7 1.41 1.546 1.85.845.44 1.943.66 3.295.66 1 0 1.91-.152 2.74-.457.844-.322 1.495-.76 1.95-1.32l3.956 1.725c-.896 1.065-2.096 1.876-3.6 2.433-1.487.558-3.245.837-5.273.837-1.994 0-3.71-.262-5.146-.786-1.436-.542-2.543-1.32-3.32-2.333-.76-1.03-1.14-2.248-1.14-3.65 0-1.42.388-2.645 1.165-3.676.777-1.03 1.876-1.816 3.295-2.356 1.437-.558 3.11-.837 5.02-.837 1.994 0 3.7.296 5.12.887 1.437.575 2.527 1.403 3.27 2.485.744 1.08 1.116 2.373 1.116 3.877v.66zm-5.173-2.585c-.032-.76-.455-1.377-1.266-1.85-.794-.473-1.825-.71-3.093-.71-1.25 0-2.272.228-3.066.684-.794.457-1.267 1.082-1.42 1.876h8.845z"></path>
              </g>
            </svg>
          </div>
          <div className="px-10 xs:px-16 bg-[url('/assets/background-twitter-blue.png')] bg-top bg-no-repeat flex flex-col gap-6 py-6 flex-1 bg-[length:100%_250px]">
            <div className="flex font-bold px-4 py-3 rounded-xl bg-main-background-1 w-full">
              <p className="flex-1 text-xl leading-6">
                Blue subscribers with a verified phone number will get a blue
                checkmark once approved.
              </p>
              <div className="relative w-4/12">
                <Image
                  alt="illustration"
                  draggable={false}
                  src={"/assets/verification-card-v2.png"}
                  fill={true}
                  className="object-contain"
                />
              </div>
            </div>
            <div className="w-full bg-[rgb(229,234,236)] dark:bg-[rgb(57,72,87)] h-10 p-1 rounded-full flex justify-between">
              <label
                htmlFor="twitter_blue_1"
                className="w-[calc(50%_-_15px)] inline-block relative text-center"
              >
                <input
                  type="radio"
                  id="twitter_blue_1"
                  name="twitter_blue"
                  className={cn(
                    "peer w-full appearance-none h-full rounded-full checked:bg-main-background-1 cursor-pointer"
                  )}
                  value={"0"}
                  checked={twitterBlue == "0"}
                  onChange={onChange}
                />
                <span className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none font-semibold text-sm opacity-70 peer-checked:opacity-100">
                  Annually&nbsp;
                  <span className="bg-green-500/10 dark:bg-green-800/40 text-green-900 dark:text-green-200 rounded-full px-2 opacity-90 text-xs">
                    SAVE&nbsp;13%
                  </span>
                </span>
              </label>
              <label
                htmlFor="twitter_blue_2"
                className="w-[calc(50%_-_15px)] inline-block relative text-center"
              >
                <input
                  type="radio"
                  id="twitter_blue_2"
                  name="twitter_blue"
                  className={cn(
                    "peer w-full appearance-none h-full rounded-full checked:bg-main-background-1 cursor-pointer"
                  )}
                  value={"1"}
                  checked={twitterBlue == "1"}
                  onChange={onChange}
                />
                <span className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none font-semibold text-sm opacity-70 peer-checked:opacity-100">
                  Monthly
                </span>
              </label>
            </div>
            <div className="border-2 border-[rgb(229,234,236)] dark:border-[rgb(57,72,87)] p-3 rounded-xl space-y-3 group cursor-pointer">
              <div className="flex justify-between items-center">
                <span className="font-bold">Blue</span>
                <div className="h-5 w-5 rounded-full bg-main-accent flex justify-center items-center relative">
                  <HeroIcon
                    iconName="CheckIcon"
                    className="text-white h-4 w-4"
                  />
                  <div className="absolute w-8 h-8 bg-main-accent/20 rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
              <ul className="list-outside list-disc ml-5 leading-4 space-y-2">
                <li>Prioritized rankings in conversations and search</li>
                <li>
                  See approximately twice as many Tweets between ads in your For
                  You and Following timelines.
                </li>
                <li>Add bold and italic text in your Tweets</li>
                <li>Post longer videos and 1080p video uploads</li>
                <li>
                  All the existing Blue features, including Edit Tweet, Bookmark
                  Folders and early access to new features
                  {isMobile && (
                    <span
                      onClick={() => setShowMore(true)}
                      className="text-main-accent"
                    >
                      {" "}
                      Learn More
                    </span>
                  )}
                </li>
              </ul>
              {!isMobile && (
                <div>
                  <div
                    onClick={() => setShowMore(!showMore)}
                    className={`p-2 hover-animation bg-transparent hover:bg-main-background-3 gap-2 items-center font-bold ${
                      showMore ? "flex justify-between mb-3" : "inline-flex"
                    }`}
                  >
                    <span>Learn More</span>
                    <HeroIcon
                      iconName="ChevronDownIcon"
                      className={cn(
                        "h-5 w-5 duration-200 transition-transform ease-in-out delay-150",
                        showMore && "-rotate-180 transform text-main-accent"
                      )}
                    />
                  </div>

                  <div className="!mt-0">
                    <AnimatePresence>
                      {showMore && (
                        <motion.div
                          {...variantHeight}
                          className={cn("leading-5 space-y-3 px-2")}
                        >
                          <motion.div {...variantOpacity}>
                            <ShowMore
                              title="Longer Tweets"
                              desc="Create Tweets, replies and Quotes up to 10,000 characters "
                              iconName="BarsArrowUpIcon"
                            />
                            <ShowMore
                              title="Edit Tweet"
                              desc="Edit a Tweet up to 5 times within 30 minutes."
                              iconName="PencilSquareIcon"
                            />
                            <ShowMore
                              title="NFT Profile Pictures"
                              desc="Show your personal flair and set your profile picture to an NFT you own."
                              iconName="UserCircleIcon"
                            />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-main-background-1 w-full inset-x-0 z-10 flex flex-col gap-2 justify-center px-5 xs:px-16 py-4 sticky bottom-0 [filter:drop-shadow(#cfd9de_0px_-2px_2px)] dark:[filter:drop-shadow(#333639_0px_-2px_2px)]">
            <ButtonHighlight text={text({ twitterBlue })} className="py-2" />
            <p className="text-xs leading-4 text-light-primary dark:text-dark-primary">
              By subscribing, you agree to our{" "}
              <span className="span-link cursor-pointer">
                Purchaser Terms of Service
              </span>
              . Subscriptions auto-renew until canceled, as described in the
              Terms. Cancel anytime. A verified phone number is required to
              subscribe. If you&#39;ve subscribed on another platform, manage
              your subscription through that platform.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const ShowMore = ({
  iconName,
  title,
  desc,
}: {
  iconName: IconName;
  title: string;
  desc: string;
}): JSX.Element => {
  return (
    <div className="flex flex-col relative pl-8 justify-start ">
      <div className="absolute top-[5px] left-0 w-10">
        <HeroIcon className="w-5 h-5" iconName={iconName} />
      </div>
      <span>{title}</span>
      <span className="text-light-secondary dark:text-dark-secondary">
        {desc}
      </span>
    </div>
  );
};

const text = ({ twitterBlue }: { twitterBlue: "0" | "1" }) => {
  return twitterBlue == "0" ? (
    <span className="flex items-center justify-center gap-2 w-full">
      <span className="font-normal line-through">IDR&nbsp;1,440,000</span>
      <span className="font-semibold">IDR&nbsp;1,250,000 / year</span>
    </span>
  ) : (
    <span className="font-semibold">IDR&nbsp;120,000 / month</span>
  );
};

const LearnMoreModal = () => {
  return (
    <motion.div {...variantOpacity} className="p-6 flex flex-col space-y-3">
      <span className="text-2xl font-bold">Get early access</span>
      <span className="text-light-secondary dark:text-dark-secondary pb-3 leading-tight">
        Twitter Blue subscribers get early access to new features like these
        through Twitter Blue Labs.
      </span>
      <div className="leading-5 space-y-3 !mt-0 pb-5">
        <ShowMore
          title="Longer Tweets"
          desc="Create Tweets, replies and Quotes up to 10,000 characters "
          iconName="BarsArrowUpIcon"
        />
        <ShowMore
          title="Edit Tweet"
          desc="Edit a Tweet up to 5 times within 30 minutes."
          iconName="PencilSquareIcon"
        />
        <ShowMore
          title="NFT Profile Pictures"
          desc="Show your personal flair and set your profile picture to an NFT you own."
          iconName="UserCircleIcon"
        />
      </div>
    </motion.div>
  );
};
