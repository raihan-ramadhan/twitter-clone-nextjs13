"use client";
import { useLayoutEffect, useRef, useState, useCallback } from "react";

export const useScroll = (): {
  scrollTop: number;
  scrollHeight: number | null;
  clientHeight: number | null;
  isScrollable: boolean;
  scrollProps: React.HTMLProps<HTMLDivElement>;
} => {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollHeight, setScrollHeight] = useState<number | null>(null);
  const [clientHeight, setClientHeight] = useState<number | null>(null);
  const myDivRef = useRef<HTMLDivElement>(null);
  const isScrollable = scrollHeight !== clientHeight;

  const onScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    setScrollTop(scrollTop);
    setScrollHeight(scrollHeight);
    setClientHeight(clientHeight);
  }, []);

  useLayoutEffect(() => {
    const el = myDivRef.current;

    if (el) {
      setScrollHeight(el.scrollHeight);
      setClientHeight(el.clientHeight);
    }
  }, []);

  return {
    scrollTop,
    scrollHeight,
    clientHeight,
    isScrollable,
    scrollProps: { onScroll, ref: myDivRef },
  };
};
