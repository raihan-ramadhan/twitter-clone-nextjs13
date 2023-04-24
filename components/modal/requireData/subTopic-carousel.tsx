import cn from "clsx";
import { useEffect, useLayoutEffect } from "react";

import { HeroIcon } from "@/components/ui/hero-icon";
import { SubTitleModal } from "@/components/ui/modal/title-modal";
import { capitalizeFirstChar } from "@/lib/utils";
import { ContainerScrollShadows } from "@/components/ui/container-scroll-shadows";

import type {
  TopicsAndSub,
  TopicsProps,
  TopicsAndSubUnion,
  TopicUnion,
  SubUnion,
} from "./topicsAndSub-modal";

type SubHandler = (topic: TopicUnion, sub: SubUnion, exist: boolean) => void;

type SubCarouselProps = {
  topic: TopicUnion;
  topics: TopicsAndSub;
  myTopics: TopicsProps<TopicsAndSubUnion>;
  subHandler: SubHandler;
};

export const SubCarousel = ({
  topics,
  myTopics,
  topic,
  subHandler,
}: SubCarouselProps): JSX.Element => {
  const findCurrentSub = () => {
    const currentTopic = topics.find((item) => item.topic == topic);
    return {
      currentTopic,
      currentTopicSubsLength: currentTopic ? currentTopic.sub.length : 0,
    };
  };

  const { currentTopic, currentTopicSubsLength } = findCurrentSub();

  if (!currentTopic)
    return <div className="text-red-300">Error Current Carousel</div>;

  const gapGrid = 10 as const;
  const borderGridItems = 1 as const;

  return (
    <div className="border-b border-b-light-secondary dark:border-b-light-line-reply">
      <SubTitleModal
        title={capitalizeFirstChar(topic)}
        className="text-xl mt-6 px-2"
      />
      <div className="relative overflow-hidden">
        <ContainerScrollShadows
          className={`grid overflow-x-auto scrollbar-hide py-4`}
          classNameContainer="w-full"
          gradient="ellipse"
          direction="x"
          style={{
            gridTemplateColumns:
              currentTopicSubsLength > 4
                ? `repeat(${Math.ceil(
                    currentTopicSubsLength / 2
                  )},minmax(max-content,1fr))`
                : `repeat(4,minmax(max-content,1fr))`,
            gap: gapGrid,
          }}
        >
          {({ isScrollable, refComponent, opacityA, opacityB }) => (
            <CarouselContent
              {...{
                borderGridItems,
                refComponent,
                currentTopic,
                isScrollable,
                subHandler,
                myTopics,
                opacityA,
                opacityB,
                gapGrid,
                topic,
              }}
            />
          )}
        </ContainerScrollShadows>
      </div>
    </div>
  );
};

function CarouselContent({
  borderGridItems,
  refComponent,
  currentTopic,
  isScrollable,
  myTopics,
  opacityA,
  opacityB,
  gapGrid,
  topic,
  subHandler,
}: {
  borderGridItems: number;
  refComponent: React.RefObject<HTMLDivElement>;
  currentTopic: TopicsAndSubUnion;
  isScrollable: boolean;
  myTopics: TopicsProps<TopicsAndSubUnion>;
  opacityA: number;
  opacityB: number;
  gapGrid: number;
  topic: TopicUnion;
  subHandler: SubHandler;
}) {
  useEffect(() => {
    const el = refComponent.current;
    if (el) {
      // make carousel to center based on scroll view
      el.scrollLeft = el.scrollWidth / 2 - el.clientWidth / 2;
      // make carousel behaviour smooth after it mounted not from the beginning,
      // because the above line is centering effect should be instant, not get notice
      el.style.scrollBehavior = "smooth";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isExist = (
    topicsAndSub: TopicsProps<TopicsAndSubUnion>,
    sub: SubUnion
  ): boolean => {
    return topicsAndSub.some((topic) => {
      return topic.sub.some((subExist) => subExist === sub);
    });
  };

  return (
    <>
      {isScrollable && (
        <>
          <div
            role="button"
            onClick={() =>
              prevScrollSnap({
                border: borderGridItems * 2,
                gap: gapGrid,
                ref: refComponent,
              })
            }
            className={cn(
              opacityA == 0 && "hidden",
              "select-none absolute rounded-full top-1/2 -translate-y-1/2 left-[2px] cursor-pointer hover:opacity-90 active:opacity-100"
            )}
          >
            <HeroIcon
              iconName="ArrowLeftCircleIcon"
              className="h-8 w-8"
              solid
            />
          </div>
          <div
            role="button"
            onClick={() =>
              nextScrollSnap({
                border: borderGridItems * 2,
                gap: gapGrid,
                ref: refComponent,
              })
            }
            className={cn(
              opacityB == 0 && "hidden",
              "select-none absolute rounded-full top-1/2 -translate-y-1/2 right-[2px] cursor-pointer hover:opacity-90 active:opacity-100"
            )}
          >
            <HeroIcon
              iconName="ArrowRightCircleIcon"
              className="h-8 w-8"
              solid
            />
          </div>
        </>
      )}
      {currentTopic.sub.map((sub, iSub) => {
        const exist = isExist(myTopics, sub);
        return (
          <div
            onClick={() => subHandler(topic, sub, exist)}
            key={`sub-${iSub}`}
            className={`rounded-full px-4 py-1 text-sm cursor-pointer ${
              exist
                ? "bg-accent-blue !border-accent-blue text-white active:opacity-80 transition-opacity"
                : "bg-main-background-1 active:bg-main-background-1 hover:bg-accent-blue/20"
            }`}
            style={{ border: `${borderGridItems}px solid #e5e7eb` }}
          >
            <span className="pointer-events-none select-none">{sub}</span>
          </div>
        );
      })}
    </>
  );
}

function nextScrollSnap({
  border,
  gap,
  ref,
}: {
  border: number;
  gap: number;
  ref: React.RefObject<HTMLDivElement>;
}) {
  const carousel = ref.current;

  if (!carousel || !(carousel.scrollWidth > carousel.clientWidth)) return;

  const childrenCarouselWidth: number[] = Array.from(carousel.children)
    .slice(2, Array.from(carousel.children).length)
    .map((item) => item.clientWidth + border + gap);

  const lastScrollLeft = carousel.scrollWidth - carousel.clientWidth;

  function getNextSnapScrollX(currScrollLeft: number) {
    let tempNumber: number = 0;
    for (let i = 0; i < childrenCarouselWidth.length; i++) {
      if (tempNumber + childrenCarouselWidth[i] >= lastScrollLeft) {
        tempNumber = lastScrollLeft;
        break;
      } else if (tempNumber + childrenCarouselWidth[i] > currScrollLeft) {
        tempNumber += childrenCarouselWidth[i];
        break;
      }
      tempNumber += childrenCarouselWidth[i];
    }
    return tempNumber;
  }

  const nextScrollSnap: number = getNextSnapScrollX(carousel.scrollLeft);
  carousel.scrollLeft = nextScrollSnap;
}

function prevScrollSnap({
  border,
  gap,
  ref,
}: {
  border: number;
  gap: number;
  ref: React.RefObject<HTMLDivElement>;
}) {
  const carousel = ref.current;

  if (!carousel || !(carousel.scrollWidth > carousel.clientWidth)) return;

  const lastScrollLeft = carousel.scrollWidth - carousel.clientWidth;

  const childrenCarouselWidth: number[] = Array.from(carousel.children)
    .slice(2, Array.from(carousel.children).length)
    .map((item) => item.clientWidth + border + gap);

  const childrenCarouselWidthReverse = childrenCarouselWidth
    .slice(0, Math.ceil(childrenCarouselWidth.length / 2))
    .reverse();

  function getPrevSnapScrollX(currScrollLeft: number) {
    let tempScrollLeft: number = lastScrollLeft;

    for (let i = 0; i < childrenCarouselWidthReverse.length; i++) {
      if (tempScrollLeft - childrenCarouselWidthReverse[i] <= 0) {
        tempScrollLeft = 0;
        break;
      } else if (
        tempScrollLeft - childrenCarouselWidthReverse[i] <
        currScrollLeft
      ) {
        tempScrollLeft -= childrenCarouselWidthReverse[i];
        break;
      }
      tempScrollLeft -= childrenCarouselWidthReverse[i];
    }
    return tempScrollLeft;
  }
  const prevScrollSnap: number = getPrevSnapScrollX(carousel.scrollLeft);

  carousel.scrollLeft = prevScrollSnap;
}
