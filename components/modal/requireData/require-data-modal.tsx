"use client";
import { sleep } from "@/lib/utils";
import { useState } from "react";
import { ListsModal } from "./lists-modal";
import { UsernameModal } from "./username-modal";
import { BirthdateModal } from "./birthdate-modal";
import { useRequireData } from "@/lib/context/require-data-context";
import { LanguagesModal } from "./languages-modal";
import { FollowingModal } from "./following-modal";
import { TopicsAndSubModal } from "./topicsAndSub-modal";
import { NotificationsModal } from "./notifications-modal";
import { CustomizeExperienceModal } from "./customizeExperience-modal";

import type {
  MainRequireData,
  SecondaryRequireData,
} from "@/lib/types/requireData";

type RequireDataModalProps = { closeModal: () => void };

export type ComponentModalProps = { nextSlide: () => Promise<void> };

export const RequireDataModal = (props: RequireDataModalProps): JSX.Element => {
  const { closeModal } = props;
  const [count, setCount] = useState<number>(0);
  const { requireData, setIsLogging } = useRequireData();

  const currentSlideName = requireData?.[count];

  const nextSlide = async (): Promise<void> => {
    if (requireData !== null) {
      if (count < requireData.length - 1) {
        setCount(count + 1);
      } else if (count < requireData.length) {
        closeModal();
        await sleep(300);
        setIsLogging(false);
      }
    }
  };

  function renderComponentBasedOnCase(
    caseValue: (MainRequireData | SecondaryRequireData) | undefined
  ): JSX.Element {
    switch (caseValue) {
      case "birthdate":
        return <BirthdateModal nextSlide={nextSlide} />;
      case "customizeExperience":
        return <CustomizeExperienceModal nextSlide={nextSlide} />;
      case "username":
        return <UsernameModal nextSlide={nextSlide} />;
      case "notifications":
        return <NotificationsModal nextSlide={nextSlide} />;
      case "languages":
        return <LanguagesModal nextSlide={nextSlide} />;
      case "topics":
        return <TopicsAndSubModal nextSlide={nextSlide} />;
      case "following":
        return <FollowingModal />;
      case "lists":
        return <ListsModal />;
      default:
        return <div className="text-red-400">Invalid case value</div>;
    }
  }

  return <>{renderComponentBasedOnCase(currentSlideName)}</>;
};
