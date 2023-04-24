import { motion } from "framer-motion";

import { HeroIcon } from "@/components/ui/hero-icon";
import { TitleForm } from "@/components/ui/modal/title-modal";
import { ParagraphModal } from "@/components/ui/modal/paragaph-modal";
import { ButtonHighlight } from "@/components/ui/modal/buttons-modal";
import { capitalizeFirstChar } from "@/lib/utils";
import { ContainerScrollShadows } from "@/components/ui/container-scroll-shadows";

import type { Variants } from "framer-motion";
import type { TopicsProps, TopicsAndSubUnion } from "./topicsAndSub-modal";

type TopicsComponentProps = {
  myTopics: TopicsProps<TopicsAndSubUnion>;
  isSubSlide: boolean;
  topicsName: Array<TopicsAndSubUnion["topic"]>;
  setMyTopics: React.Dispatch<
    React.SetStateAction<TopicsProps<TopicsAndSubUnion>>
  >;
  setIsSubSlide: React.Dispatch<React.SetStateAction<boolean>>;
};

const variants: Variants = {
  initial: { opacity: 0, scale: 0.5, display: "none" },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", duration: 0.4, delay: 0.1, bounce: 0.6 },
    display: "block",
  },
  exit: {
    scale: 0.5,
    transition: { opacity: 0, duration: 0.15 },
    transitionEnd: {
      display: "none",
    },
  },
};

const variantsSpan: Variants = {
  initial: { opacity: 0, transform: "translateX(-100%)" },
  animate: {
    opacity: 1,
    transform: "translateX(0%)",
    transition: { type: "spring", duration: 1 },
  },
  exit: {
    transition: { opacity: 0, x: 0, duration: 0.15 },
  },
};

export const Topics = ({
  isSubSlide,
  topicsName,
  myTopics,
  setMyTopics,
  setIsSubSlide,
}: TopicsComponentProps): JSX.Element => {
  const topicHandler = (topic: TopicsAndSubUnion["topic"]): void => {
    const newTopics = [...myTopics];
    const index = newTopics.findIndex((item) => item.topic == topic);

    if (index >= 0) {
      newTopics.splice(index, 1);
      setMyTopics(newTopics);
    } else {
      setMyTopics((prev) => [...prev, { topic, sub: [] }]);
    }
  };
  return (
    <>
      <div className="h-full max-h-[calc(100%_-_100px)] xs:h-[475px] relative z-0">
        <ContainerScrollShadows
          className="px-10 xs:px-16 relative bg-main-background-1 h-full"
          classNameContainer="h-full"
          classnameShadows="!w-[calc(100%_-_.5rem)]"
          gradient="ellipse"
        >
          <div className="flex flex-col mb-6 z-0">
            <TitleForm title={"What do you want to see in Twitter?"} />
            <ParagraphModal
              text={
                "Select at least 3 interest to pesonalize you Twitter experience. They will be visible on your profile."
              }
              className="text-base"
            />
          </div>
          <div className="grid grid-cols-2 xs:grid-cols-3 gap-3 min-h-[575px] w-full pb-10 px-2">
            {topicsName.map((topic, index) => {
              const exist = myTopics.some((item) => item.topic === topic);
              return (
                <div
                  key={`topic-${index}`}
                  className={`aspect-w-1 aspect-h-1 overflow-hidden transition-colors duration-200 border border-light-border rounded-lg cursor-pointer relative ${
                    exist
                      ? "bg-accent-blue !border-accent-blue text-white active:opacity-80 transition-opacity"
                      : "bg-main-background-1 active:bg-main-background-1 hover:bg-accent-blue/20"
                  }`}
                  onClick={() => topicHandler(topic)}
                >
                  {exist && (
                    <motion.div
                      {...variants}
                      className="!absolute h-6 w-6 z-10 left-auto bottom-auto right-2 top-2"
                    >
                      <HeroIcon
                        className="h-[inherit] w-[inherit] text-white"
                        iconName="CheckCircleIcon"
                        solid
                      />
                    </motion.div>
                  )}
                  <div className="p-2 flex items-end">
                    <span className="font-bold">
                      {capitalizeFirstChar(topic)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </ContainerScrollShadows>
      </div>

      <div className="h-[100px] px-5 xs:px-16 flex items-center bg-main-background-1 xs:rounded-b-2xl">
        <div className="flex-1 overflow-hidden">
          {myTopics.length >= 3 && (
            <motion.div
              {...variantsSpan}
              className="font-semibold inline-block"
            >
              Great work 🎉
            </motion.div>
          )}
          {myTopics.length < 3 && (
            <motion.div
              {...variantsSpan}
              className="font-semibold inline-block"
            >
              {myTopics.length} of 3 selected
            </motion.div>
          )}
        </div>
        <ButtonHighlight
          disabled={myTopics.length < 3}
          callback={() => {
            if (!isSubSlide) setIsSubSlide(true);
          }}
          text="Next"
          className="text-lg max-w-[100px] p-2"
        />
      </div>
    </>
  );
};
