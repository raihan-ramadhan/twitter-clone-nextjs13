import { Button } from "@/components/ui/button";
import { UserName } from "@/components/user/user-name";
import { UserAvatar } from "@/components/user/user-avatar";
import { InputThemeRadio } from "../../input/input-theme-radio";
import { InputAccentRadio } from "@/components/input/input-accent-radio";
import { XModal } from "@/components/ui/modal/x-modal";

import type { Theme, Accent } from "@/lib/types/theme";
import type { LeftMoreModalContent } from "./left-more-modal";

const themes: Readonly<[Theme, string][]> = [
  ["light", "Default"],
  ["dim", "Dim"],
  ["dark", "Lights out"],
];

const accentsColor: Readonly<Accent[]> = [
  "blue",
  "yellow",
  "pink",
  "purple",
  "orange",
  "green",
];

export function DisplayModal({
  closeModal,
}: LeftMoreModalContent): JSX.Element {
  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <XModal closeModal={closeModal} className="sm:hidden" />
      <div className="flex flex-col gap-3 text-center">
        <h2 className="text-2xl font-bold">Customize your view</h2>
        <p className="text-light-secondary dark:text-dark-secondary">
          These settings affect all the Twitter accounts on this browser.
        </p>
      </div>
      <article className="hover-animation sm:mx-8 rounded-2xl border border-light-border px-4 py-3 dark:border-dark-border">
        <div className="grid grid-cols-[auto,1fr] gap-3">
          <UserAvatar src="/assets/twitter-avatar.jpg" alt="Twitter" />
          <div>
            <div className="flex gap-1">
              <UserName verified name="Twitter" />
              <p className="text-light-secondary dark:text-dark-secondary">
                @twitter
              </p>
              <div className="flex gap-1 text-light-secondary dark:text-dark-secondary">
                <i>·</i>
                <p>26m</p>
              </div>
            </div>
            <p className="whitespace-pre-line break-words">
              At the heart of Twitter are short messages called Tweets — just
              like this one — which can include photos, videos, links, text,
              hashtags, and mentions like{" "}
              <span className="text-main-accent">@twitter</span>.
            </p>
          </div>
        </div>
      </article>
      <div className="flex w-full flex-col gap-1">
        <p className="text-sm font-bold text-light-secondary dark:text-dark-secondary">
          Text
        </p>
        <div className="hover-animation grid grid-cols-3 grid-rows-2 justify-items-center gap-3 rounded-2xl bg-main-background-3 py-3 xs:grid-cols-6 xs:grid-rows-none">
          <p>SOON</p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-1">
        <p className="text-sm font-bold text-light-secondary dark:text-dark-secondary">
          Color
        </p>
        <div className="hover-animation grid grid-cols-3 grid-rows-2 justify-items-center gap-3 rounded-2xl bg-main-background-3 py-3 xs:grid-cols-6 xs:grid-rows-none">
          {accentsColor.map((accentColor) => (
            <InputAccentRadio type={accentColor} key={accentColor} />
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col gap-1 ">
        <p className="text-sm font-bold text-light-secondary dark:text-dark-secondary">
          Background
        </p>
        <div className="hover-animation grid grid-rows-3 gap-3 px-4 py-3 xs:grid-cols-3 xs:grid-rows-none bg-main-background-3 rounded-2xl">
          {themes.map(([themeType, label]) => (
            <InputThemeRadio type={themeType} label={label} key={themeType} />
          ))}
        </div>
      </div>
      <Button
        className="bg-main-accent px-4 py-1.5 font-bold text-white hover:bg-main-accent/90 active:bg-main-accent/75"
        onClick={closeModal}
      >
        Done
      </Button>
    </div>
  );
}
