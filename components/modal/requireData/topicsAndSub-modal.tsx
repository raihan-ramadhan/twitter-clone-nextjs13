"use client";
import { useState } from "react";

import { Topics } from "./topics";
import { SubTopics } from "./subTopic";
import { CustomIcon } from "@/components/ui/custom-icons";
import { topics as topicsName, topicsAndSub } from "@/lib/data/user";

import type { ComponentModalProps } from "./require-data-modal";

export type TopicsAndSub = typeof topicsAndSub;
export type TopicsAndSubUnion = TopicsAndSub[number];
export type SubUnion = TopicsAndSubUnion["sub"][number];
export type TopicUnion = TopicsAndSubUnion["topic"];
export type TopicsProps<T extends TopicsAndSubUnion> = Array<{
  [K in keyof T]: K extends "sub" ? Array<T[K][number]> : T[K];
}>;

export const TopicsAndSubModal = (props: ComponentModalProps): JSX.Element => {
  const { nextSlide } = props;
  const [topics, setTopics] = useState<TopicsProps<TopicsAndSubUnion>>([]);
  const [isSubSlide, setIsSubSlide] = useState<boolean>(false);

  function renderComponentBaseOnIsSubSlide() {
    return !isSubSlide ? (
      <Topics
        {...{ topics, setTopics, isSubSlide, setIsSubSlide, topicsName }}
      />
    ) : (
      <SubTopics
        {...{
          topics,
          setTopics,
          topicsAndSub,
          nextSlide,
        }}
      />
    );
  }

  return (
    <>
      <CustomIcon
        className="w-8 h-8 text-accent-blue mx-auto absolute top-5 left-1/2 -translate-x-1/2 "
        iconName="TwitterIcon"
      />
      <div className="pt-[75px] h-full xs:min-h-[inherit] w-full flex flex-col">
        {renderComponentBaseOnIsSubSlide()}
      </div>
    </>
  );
};
