import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/lib/firebase/app";
import { TitleForm } from "@/components/ui/modal/title-modal";
import { SubCarousel } from "./subTopic-carousel";
import { useRequireData } from "@/lib/context/require-data-context";
import { ParagraphModal } from "@/components/ui/modal/paragaph-modal";
import { ButtonHighlight } from "@/components/ui/modal/buttons-modal";
import { updateUserTopics } from "@/lib/firebase/utils";
import { ContainerScrollShadows } from "@/components/ui/container-scroll-shadows";

import type {
  TopicsAndSub,
  TopicsProps,
  TopicsAndSubUnion,
  TopicUnion,
  SubUnion,
} from "./topicsAndSub-modal";

type SubTopicsComponentProps = {
  myTopics: TopicsProps<TopicsAndSubUnion>;
  topics: TopicsAndSub;
  nextSlide: () => Promise<void>;
  setMyTopics: React.Dispatch<
    React.SetStateAction<TopicsProps<TopicsAndSubUnion>>
  >;
};

export const SubTopics = ({
  topics,
  myTopics,
  setMyTopics,
  nextSlide,
}: SubTopicsComponentProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setError } = useRequireData();

  const subHandler = (topic: TopicUnion, sub: SubUnion, exist: boolean) => {
    setMyTopics((prevTopicAndSub) => {
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
          await updateUserTopics(uid, myTopics);
          setLoading(false);
          await nextSlide();
        }
      } catch (error) {
        setError(true);
      }
    });
  };

  return (
    <>
      <div className="h-[calc(100%_-_100px)] xs:h-[475px] w-full relative z-0">
        <ContainerScrollShadows
          classNameContainer="h-full"
          className={`h-full w-full overflow-y-auto overflow-x-hidden scrollbar-thumb-accent-blue scrollbar-track-main-background-3 scrollbar-thin px-10 xs:px-16`}
          gradient="ellipse"
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
          <div>
            {myTopics.map((topic, iTopic) => {
              return (
                <SubCarousel
                  {...{ myTopics, topics, subHandler }}
                  topic={topic.topic}
                  key={`subTopic-${iTopic}`}
                />
              );
            })}
          </div>
        </ContainerScrollShadows>
      </div>
      <div className="h-[100px] px-5 xs:px-16 flex items-center bg-main-background-1 xs:rounded-b-2xl">
        <ButtonHighlight
          disabled={myTopics.length < 3}
          loading={loading}
          callback={fillTopics}
          text="Next"
          className="text-lg p-2"
        />
      </div>
    </>
  );
};
