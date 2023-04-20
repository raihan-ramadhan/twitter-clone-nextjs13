"use client";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";

export type ScrollSnap = { border: number; gap: number };

export const useScrollXCarousel = (): {
  scrollProps: React.HTMLProps<HTMLDivElement>;
  isScrollable: boolean;
  nextScrollSnap: (props: ScrollSnap) => void;
  prevScrollSnap: (props: ScrollSnap) => void;
  opacityLeft: number;
  opacityRight: number;
} => {
  const [scrollWidth, setScrollWidth] = useState<number | null>(null);
  const [clientWidth, setClientWidth] = useState<number | null>(null);
  const [opacityState, setOpacityState] = useState<number | null>(null);

  const opacityLeft = typeof opacityState !== "number" ? 0 : opacityState;
  const opacityRight = typeof opacityState !== "number" ? 0 : 1 - opacityState;
  const carouselRef = useRef<HTMLDivElement>(null);
  const isScrollable = scrollWidth !== clientWidth;

  const onScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft, clientWidth, scrollWidth } = event.currentTarget;
    setOpacityState(scrollLeft / (scrollWidth - clientWidth));
  }, []);

  useLayoutEffect(() => {
    const el = carouselRef.current;
    if (el) {
      setOpacityState(el.scrollLeft / (el.scrollWidth - el.clientWidth));
      setScrollWidth(el.scrollWidth);
      setClientWidth(el.clientWidth);
      // make carousel to center based on scroll view
      el.scrollLeft = el.scrollWidth / 2 - el.clientWidth / 2;
      // make carousel behaviour smooth after it mounted not from the beginning,
      // because the above line is centering effect should be instant, not get notice
      el.style.scrollBehavior = "smooth";
    }
  }, []);

  const nextScrollSnap = ({ border, gap }: { border: number; gap: number }) => {
    const carousel = carouselRef.current;

    if (!carousel || !(carousel.scrollWidth > carousel.clientWidth)) return;

    const childrenCarouselWidth: number[] = Array.from(carousel.children).map(
      (item) => item.clientWidth + border + gap
    );

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
  };

  const prevScrollSnap = ({ border, gap }: { border: number; gap: number }) => {
    const carousel = carouselRef.current;

    if (!carousel || !(carousel.scrollWidth > carousel.clientWidth)) return;

    const lastScrollLeft = carousel.scrollWidth - carousel.clientWidth;

    const childrenCarouselWidth: number[] = Array.from(carousel.children).map(
      (item) => item.clientWidth + border + gap
    );

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
  };

  return {
    scrollProps: { onScroll, ref: carouselRef },
    isScrollable,
    nextScrollSnap,
    prevScrollSnap,
    opacityLeft,
    opacityRight,
  };
};
