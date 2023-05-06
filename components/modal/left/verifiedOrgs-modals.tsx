import React from "react";
import Image from "next/image";

import { XModal } from "@/components/ui/modal/x-modal";
import { ParagraphModal } from "@/components/ui/modal/paragaph-modal";
import { ButtonHighlight } from "@/components/ui/modal/buttons-modal";
import { SubTitleModal, TitleForm } from "@/components/ui/modal/title-modal";

import type { LeftMoreModalContent } from "./left-more-modal";

const verifiedDetails: Array<{ subtitle: string; paragraph: string }> = [
  {
    subtitle: "Verification management",
    paragraph:
      "Receive a gold or grey checkmark and verify accounts affiliated with your organization through our new Verified portal.",
  },
  {
    subtitle: "Custom organization profile",
    paragraph:
      "Elevate and distinguish your organization with a square avatar, and a new tab that lists all affiliated accounts.",
  },
  {
    subtitle: "Impersonation defense",
    paragraph:
      "Accounts impersonating Verified Organizations are flagged for further review if impersonation is detected.",
  },
  {
    subtitle: "Premium support",
    paragraph:
      "Organizations get exclusive access to contact premium support, ensuring timely help and escalations.",
  },
  {
    subtitle: "Elevated Tweet, DM, and media upload limits",
    paragraph:
      "Verified Organizations and their affiliates have significantly elevated Tweet, DM, and media upload rate limits.",
  },
  {
    subtitle: "Twitter Blue",
    paragraph:
      "All accounts (organizations and their affiliates) will receive all the benefits of Twitter Blue.",
  },
];

export const VerifiedOrgsModal = ({ closeModal }: LeftMoreModalContent) => {
  return (
    <div className="relative min-h-[inherit]">
      <div>
        <div className="sticky top-0 h-12 bg-main-background-1/70 backdrop-blur-lg z-10">
          <div>
            <XModal closeModal={closeModal} />
          </div>
        </div>
        <div className="z-0 space-y-5 px-16 pb-12">
          <Image
            className="mx-auto"
            height={140}
            width={140}
            alt="illustration-magnified-earth"
            src={"/assets/illustration-magnified-earth.png"}
          />
          <TitleForm className="text-3xl" title="Verified Organizations" />
          <SubTitleModal
            className="text-lg"
            title="Verified Organizations is for organizations of all types–businesses, non-profits, and government institutions–to manage their verification, affiliate and verify any related account, and unlock new features."
          />
          {verifiedDetails.map(({ paragraph, subtitle }) => {
            return (
              <div>
                <SubTitleModal className="text-lg" title={subtitle} />
                <ParagraphModal secondary text={paragraph} />
              </div>
            );
          })}
          <div>
            <ParagraphModal
              text={
                "Verified Organizations is IDR 15,056,000 per month (plus any applicable tax). Each additional affiliated account is IDR 752,800 per handle per month (plus any applicable tax)."
              }
            />
            <a
              href="https://help.twitter.com/en/using-twitter/verified-organizations"
              target="_blank"
              className="span-link text-current font-bold"
            >
              Learn More
            </a>
          </div>
          <ButtonHighlight text={"Subscribe & Pay"} />
          <p className="small-description">
            By clicking Subscribe, you agree to our Purchaser Terms of Service.
            Subscriptions auto-renew until canceled, as described in the Terms.
            Cancel anytime. Accounts that sign up are reviewed. If we determine
            at any time that your main account is not an organization or you
            violate our terms and policies, your subscription will be canceled
            and you will not be refunded during your existing billing period
            unless required by law. See more{" "}
            <a
              href="https://legal.twitter.com/en/purchaser-terms.html"
              className="span-link"
              target="_blank"
            >
              here
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
