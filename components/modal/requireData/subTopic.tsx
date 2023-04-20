import cn from "clsx";
import { Dispatch, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/lib/firebase/app";
import { TitleForm } from "@/components/ui/modal/title-modal";
import { useScroll } from "@/lib/hooks/useScroll";
import { useRequireData } from "@/lib/context/require-data-context";
import { ParagraphModal } from "@/components/ui/modal/paragaph-modal";
import { ButtonHighlight } from "@/components/ui/modal/buttons-modal";

import type {
  TopicsAndSub,
  TopicsProps,
  TopicsAndSubUnion,
  TopicUnion,
  SubUnion,
} from "./topicsAndSub-modal";
import { SubCarousel } from "./sub-carousel";
import { updateUserTopics } from "@/lib/firebase/utils";

type SubTopicsComponentProps = {
  topicsAndSub: TopicsAndSub;
  setTopics: Dispatch<React.SetStateAction<TopicsProps<TopicsAndSubUnion>>>;
  topics: TopicsProps<TopicsAndSubUnion>;
  nextSlide: () => Promise<void>;
};

type SubTopicsWithScrollProps = SubTopicsComponentProps & {
  children: React.ReactNode;
  loading: boolean;
  fillTopics: () => void;
};

export const SubTopics = ({
  topicsAndSub,
  topics,
  setTopics,
  nextSlide,
}: SubTopicsComponentProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setError } = useRequireData();

  const subHandler = (topic: TopicUnion, sub: SubUnion, exist: boolean) => {
    setTopics((prevTopicAndSub) => {
      return prevTopicAndSub.map((prev) => {
        const itemsSub = [...prev.sub];

        return !(prev.topic == topic)
          ? prev
          : ({
              topic,
              sub: exist
                ? itemsSub.filter((test) => test !== sub)
                : [...prev.sub, sub],
            } as TopicsProps<TopicsAndSubUnion>[number]);
      });
    });
  };

  const fillTopics = () => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const uid = user.uid;
          setLoading(true);
          await updateUserTopics(uid, topics);
          setLoading(false);
          await nextSlide();
        }
      } catch (error) {
        setError(true);
      }
    });
  };

  return (
    <SubTopicsWithScroll
      {...{
        nextSlide,
        topics,
        setTopics,
        topicsAndSub,
        loading,
        fillTopics,
      }}
    >
      <div>
        {topics.map((topic, iTopic) => {
          return (
            <SubCarousel
              {...{ topic, topics, topicsAndSub, subHandler }}
              key={`subTopic-${iTopic}`}
            />
          );
        })}
      </div>
    </SubTopicsWithScroll>
  );
};

const SubTopicsWithScroll = ({
  children,
  topics,
  loading,
  fillTopics,
}: SubTopicsWithScrollProps): JSX.Element => {
  const { scrollProps, scrollTop, clientHeight, scrollHeight, isScrollable } =
    useScroll();

  const opacityShadowTop =
    scrollHeight && clientHeight && isScrollable
      ? scrollTop / (scrollHeight - clientHeight)
      : 0;

  const opacityShadowBottom =
    scrollHeight && clientHeight && isScrollable
      ? 1 - scrollTop / (scrollHeight - clientHeight)
      : 0;

  return (
    <>
      <div className="h-[calc(100%_-_100px)] xs:h-[475px] w-full relative z-0">
        <div
          className={`h-full w-full overflow-y-auto overflow-x-hidden scrollbar-thumb-accent-blue scrollbar-track-main-background-3 scrollbar-thin px-10 xs:px-16`}
          {...scrollProps}
        >
          <div className="flex flex-col mb-3 z-0">
            <TitleForm title={"What do you want to see in Twitter?"} />
            <ParagraphModal
              text={
                "Interests are used to personalized your experience and will be visible on your profile."
              }
              className="text-base"
            />
          </div>
          {children}
        </div>
        <div
          id="shadow-top-subtopics"
          className={cn(
            `z-10 absolute top-0 h-5 bg-gradient-to-b from-black/10 dark:from-white/10 to-transparent pointer-events-none`,
            isScrollable && "w-[calc(100%_-_.5rem)]"
          )}
          style={{ opacity: opacityShadowTop }}
        />
        <div
          id="shadow-bottom-subtopics"
          className={cn(
            `z-10 absolute bottom-0 h-5 bg-gradient-to-t from-black/10 dark:from-white/10 to-transparent pointer-events-none`,
            isScrollable && "w-[calc(100%_-_.5rem)]"
          )}
          style={{ opacity: opacityShadowBottom }}
        />
      </div>
      <div className="h-[100px] px-5 xs:px-12 flex items-center bg-main-background-1 xs:rounded-b-2xl">
        <ButtonHighlight
          disabled={topics.length < 3}
          loading={loading}
          callback={fillTopics}
          text="Next"
          className="text-lg p-2"
        />
      </div>
    </>
  );
};
