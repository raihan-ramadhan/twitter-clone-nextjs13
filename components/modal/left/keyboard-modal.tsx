import { XModal } from "@/components/ui/modal/x-modal";
import { keysTables } from "@/lib/data/keyboard-keys";
import { SubTitleModal, TitleModal } from "@/components/ui/modal/title-modal";

import type { LeftMoreModalContent } from "./left-more-modal";

export const KeyboardModal = (props: LeftMoreModalContent) => {
  const { closeModal } = props;

  return (
    <div className="relative min-h-[inherit] ">
      <div className="sticky top-0 bg-main-background-1/70 backdrop-blur-lg z-10 min-h-[52px] flex flex-col justify-center">
        <XModal closeModal={closeModal} />
        <div className="sm:flex items-center pl-16 pr-16 sm:pr-4 gap-2 pt-3 sm:pt-0">
          <TitleModal title="Keyboard shortcuts" className="text-xl" />
          <span className="text-red-500 text-xs flex-1 text-right gap-5">
            **the shortcut keys hasn't been added yet, I just want to make this
            first
          </span>
        </div>
      </div>
      <div className="px-4 py-3 space-y-5 sm:space-y-0 sm:flex w-full justify-around items-start gap-5">
        {keysTables.map(({ title, rows }, index) => {
          return (
            <table className="w-full">
              <thead>
                <SubTitleModal
                  title={title}
                  className="text-xl !font-bold text-left"
                />
              </thead>
              <div className="pr-5 border-r border-r-light-border dark:border-r-dark-border">
                <tbody className="flex flex-col gap-1">
                  {rows.map(({ subtitle, keys }, index) => {
                    return (
                      <tr className="flex justify-between">
                        <td className="flex-1">
                          <span>{subtitle}</span>
                        </td>
                        <td className="">
                          {keys.map((key, index) => {
                            return (
                              <>
                                <span className="inline-block rounded-md bg-main-background-3 dark:bg-main-background-3 px-2 [box-shadow:0_1px_2px_rgba(0,0,0,0.15)] dark:[box-shadow:0_1px_2px_rgba(255,255,255,0.15)]">
                                  <code>{key}</code>
                                </span>
                                {index !== keys.length - 1 && <span>+</span>}
                              </>
                            );
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </div>
            </table>
          );
        })}
      </div>
    </div>
  );
};
