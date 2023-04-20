import cn from "clsx";

import { HeroIcon } from "@/components/ui/hero-icon";
import { SubTitleModal } from "@/components/ui/modal/title-modal";
import { useScrollXCarousel } from "@/lib/hooks/useScrollXCarousel";
import { capitalizeFirstChar } from "@/lib/utils";

import type {
  TopicsAndSub,
  TopicsProps,
  TopicsAndSubUnion,
  TopicUnion,
  SubUnion,
} from "./topicsAndSub-modal";
import type { ScrollSnap } from "../../../lib/hooks/useScrollXCarousel";

type SubCarouselProps = {
  topicsAndSub: TopicsAndSub;
  topics: TopicsProps<TopicsAndSubUnion>;
  topic: TopicsProps<TopicsAndSubUnion>[number];
  subHandler: (topic: TopicUnion, sub: SubUnion, exist: boolean) => void;
};

export const SubCarousel = ({
  topicsAndSub,
  topics,
  topic,
  subHandler,
}: SubCarouselProps): JSX.Element => {
  const {
    scrollProps,
    opacityLeft,
    opacityRight,
    isScrollable,
    prevScrollSnap,
    nextScrollSnap,
  } = useScrollXCarousel();

  const isExist = (
    topicsAndSub: TopicsProps<TopicsAndSubUnion>,
    sub: SubUnion
  ): boolean => {
    return topicsAndSub.some((topic) => {
      return topic.sub.some((subExist) => subExist === sub);
    });
  };

  const gapGrid = 10 as const;
  const borderGridItems = 1 as const;
  const borderGridItemsX = borderGridItems * 2;
  const scrollSnapProps: ScrollSnap = {
    border: borderGridItemsX,
    gap: gapGrid,
  };

  const carousel = () => {
    const subs = topicsAndSub.find((item) => item.topic == topic.topic);
    return { subs, subsLength: subs ? subs.sub.length : 0 };
  };

  const { subs, subsLength } = carousel();

  if (!subs) return <div>SOMETHING WRONG</div>;

  return (
    <div className="border-b border-b-light-secondary dark:border-b-light-line-reply">
      <SubTitleModal
        title={capitalizeFirstChar(topic.topic)}
        className="text-2xl mt-6"
      />
      <div className="relative overflow-hidden">
        {isScrollable && (
          <>
            <div
              id={`shadow-left-carousel-${subs?.topic}`}
              className={cn(
                `z-10 absolute left-0 inset-y-0 h-full w-3 ellipse-gradient-background-light dark:ellipse-gradient-background-dark pointer-events-none`
              )}
              style={{ opacity: opacityLeft }}
            />
            <div
              id={`shadow-left-carousel-${subs?.topic}`}
              className={cn(
                `z-10 absolute right-0 rotate-180 inset-y-0 h-full w-2 ellipse-gradient-background-light dark:ellipse-gradient-background-dark pointer-events-none`
              )}
              style={{ opacity: opacityRight }}
            />
          </>
        )}
        {opacityRight && isScrollable ? (
          <div
            role="button"
            onClick={() => nextScrollSnap(scrollSnapProps)}
            className="select-none absolute rounded-full top-1/2 -translate-y-1/2 right-[2px] cursor-pointer hover:opacity-90 active:opacity-100"
          >
            <HeroIcon
              iconName="ArrowRightCircleIcon"
              className="h-8 w-8"
              solid
            />
          </div>
        ) : undefined}

        {opacityLeft && isScrollable ? (
          <div
            role="button"
            onClick={() => prevScrollSnap(scrollSnapProps)}
            className="select-none absolute rounded-full top-1/2 -translate-y-1/2 left-[2px] cursor-pointer hover:opacity-90 active:opacity-100"
          >
            <HeroIcon
              iconName="ArrowLeftCircleIcon"
              className="h-8 w-8"
              solid
            />
          </div>
        ) : undefined}

        <div
          {...scrollProps}
          style={{
            gridTemplateColumns:
              subsLength > 4
                ? `repeat(${Math.ceil(subsLength / 2)},minmax(max-content,1fr))`
                : `repeat(4,minmax(max-content,1fr))`,
            gap: gapGrid,
          }}
          className={`grid overflow-x-auto scrollbar-hide py-4`}
        >
          {subs.sub.map((sub, iSub) => {
            const exist = isExist(topics, sub);

            return (
              <div
                onClick={() => subHandler(topic.topic, sub, exist)}
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
        </div>
      </div>
    </div>
  );
};
