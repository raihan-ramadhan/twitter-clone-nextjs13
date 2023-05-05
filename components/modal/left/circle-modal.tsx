"use client";
import cn from "clsx";
import { useState } from "react";

import { XModal } from "@/components/ui/modal/x-modal";
import { SearchBar } from "@/components/ui/search-bar";
import { TitleForm } from "@/components/ui/modal/title-modal";

type CircleModalProps = {
  closeModal: () => void;
};

export const CircleModal = ({ closeModal }: CircleModalProps): JSX.Element => {
  const [currentTab, setCurrentTab] = useState<0 | 1>(0);

  return (
    <div className="relative min-h-[inherit]">
      <div>
        <div className="sticky top-0 bg-main-background-1/70 backdrop-blur-lg z-10">
          <div>
            <XModal closeModal={closeModal} />
          </div>
          <TitleForm
            title="Edit your Twitter Circle"
            className="text-lg xs:text-2xl py-2 pl-20"
          />
          <div className="flex w-full">
            <div
              onClick={() => setCurrentTab(0)}
              className="hover:bg-main-background-2 hover-animation cursor-pointer w-1/2 h-14 flex flex-col items-center"
            >
              <div className="relative h-full flex items-center">
                <span>Twitter Circle</span>
                <div
                  className={cn(
                    "w-full bg-main-accent absolute bottom-0 transition-[height] duration-[0.1]",
                    currentTab == 0 ? "h-1" : "h-0"
                  )}
                />
              </div>
            </div>
            <div
              onClick={() => setCurrentTab(1)}
              className="hover:bg-main-background-2 hover-animation cursor-pointer w-1/2 h-14 flex flex-col items-center"
            >
              <div className="relative h-full flex items-center">
                <span>Recommended</span>
                <div
                  className={cn(
                    "w-full bg-main-accent absolute bottom-0 transition-[height] duration-[0.1]",
                    currentTab == 1 ? "h-1" : "h-0"
                  )}
                />
              </div>
            </div>
          </div>
          <hr className="border-t-light-border dark:border-t-dark-border" />
        </div>
        <div className="space-y-4 mt-4 z-0">
          {currentTab === 0 ? (
            <>
              <p className="text-center px-10">
                People won&#39;t be notified when you edit your Twitter Circle.
                Anyone you add will be able to see your previous Twitter Circle
                Tweets.{" "}
                <a
                  href="https://help.twitter.com/en/using-twitter/twitter-circle"
                  className="span-link !text-current font-bold hyphens-manual"
                  target="_blank"
                >
                  How it works
                </a>
              </p>
              <div className="max-w-xs mx-auto">
                <p className="text-3xl font-bold">
                  There isn&#39;t anyone in your Twitter Circle — yet
                </p>
                <p className="my-5">
                  When you add people, they&#39;ll show up here.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="px-5">
                <SearchBar
                  placeholder={"Search People"}
                  className={
                    "bg-main-background-1 ring-1 ring-light-line-reply dark:ring-light-secondary"
                  }
                  centerPlaceHolder
                />
              </div>
              <p className="text-center px-10">
                People won&#39;t be notified when you edit your Twitter Circle.
                Anyone you add will be able to see your previous Twitter Circle
                Tweets.{" "}
                <a
                  href="https://help.twitter.com/en/using-twitter/twitter-circle"
                  className="span-link !text-current font-bold hyphens-manual"
                  target="_blank"
                >
                  How it works
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
