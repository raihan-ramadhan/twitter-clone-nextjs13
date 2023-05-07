import Image from "next/image";

import { XModal } from "@/components/ui/modal/x-modal";
import { TitleModal } from "@/components/ui/modal/title-modal";
import { CustomIcon } from "@/components/ui/custom-icons";
import { ParagraphModal } from "@/components/ui/modal/paragaph-modal";
import { ButtonHighlight } from "@/components/ui/modal/buttons-modal";

export type LeftMoreModalContent = { closeModal: () => void };

export const ProfessionalModal = (props: LeftMoreModalContent): JSX.Element => {
  const { closeModal } = props;

  return (
    <>
      <CustomIcon
        className="w-8 h-8 mx-auto absolute top-2.5 left-1/2 -translate-x-1/2"
        iconName="TwitterIcon"
      />
      <XModal closeModal={closeModal} className="z-10" />
      <div className="relative z-0 min-h-[inherit] h-[inherit] pt-[50px] flex flex-col">
        <div className="aspect-w-2 aspect-h-1">
          <Image
            src={"/assets/upsell_header_wide_v2.png"}
            alt="upsell header wide"
            fill={true}
            className="object-contain object-top"
          />
        </div>
        <div className="px-8 sm:px-20 flex flex-col flex-1 mt-8 xs:mt-3">
          <div className="space-y-5 xs:space-y-3 flex-1">
            <TitleModal
              title="Twitter for Professionals"
              className="text-3xl"
            />
            <ParagraphModal
              text="Get access to the tools you need to better connect with your audience, grow your brand, and increase your profits."
              secondary
            />
            <ParagraphModal
              text={
                <span>
                  By tapping &quot;Agree & continue&quot;, you are agreeing to
                  our{" "}
                  <a
                    href="https://help.twitter.com/en/rules-and-policies/professional-account-policy"
                    target="_blank"
                    className="span-link"
                  >
                    Professional Account policy.
                  </a>
                </span>
              }
              secondary
            />
          </div>
          <div className="h-[100px] w-full flex items-center">
            <ButtonHighlight
              text={"Agree & Continue"}
              className="text-lg py-3"
            />
          </div>
        </div>
      </div>
    </>
  );
};
