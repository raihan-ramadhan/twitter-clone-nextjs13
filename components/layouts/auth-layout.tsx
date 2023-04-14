"use client";
import cn from "clsx";
import { Modal } from "../modal/modal";
import { Button } from "../ui/button";
import { useAuth } from "@/lib/context/auth-context";
import { Loading } from "../ui/loading";
import { useWindow } from "@/lib/context/window-context";
import { LoginModal } from "../modal/login-modal";
import { Placeholder } from "../common/placeholder";
import { SignupModal } from "../modal/signup-modal";
import { useRequireData } from "@/lib/context/require-data-context";
import { RequireDataModal } from "../modal/requireData/require-data-modal";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import type { Variants } from "framer-motion";
import type { LayoutProps } from "./common-layout";
type OpenState = { signIn: boolean; signUp: boolean };

const initialOpenSign = { signIn: false, signUp: false };

export const AuthLayout = ({ children }: LayoutProps): JSX.Element => {
  const [openSign, setOpenSign] = useState<OpenState>(initialOpenSign);
  const { user, loading } = useAuth();
  const { isMobile } = useWindow();
  const {
    loading: loadingRequireData,
    requireData,
    isLogging,
    error,
  } = useRequireData();
  const asPathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (user && asPathname === "/") router.push("/home");
    setOpenSign(initialOpenSign);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if ((loading && !isLogging) || (user && asPathname === "/"))
    return <Placeholder />;

  const variants: Variants = !isMobile
    ? {
        initial: { opacity: 0, scale: 0.8 },
        animate: {
          opacity: 1,
          scale: 1,
          transition: { type: "spring", duration: 0.5, bounce: 0.4 },
        },
        exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
      }
    : {
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: { duration: 0.2 },
        },
        exit: { opacity: 0, transition: { duration: 0.15 } },
      };

  const closeModalSign = (): void => {
    setOpenSign(initialOpenSign);
  };

  const switchSign: () => void = () => {
    setOpenSign(({ signIn, signUp }) => ({ signIn: !signIn, signUp: !signUp }));
  };

  function renderComponentBasedOnCondition(): JSX.Element {
    if (!error) {
      if (loadingRequireData) {
        return (
          <div className="flex w-full h-full justify-center items-center">
            <Loading iconClassName="h-7 w-7 !text-accent-blue" />
          </div>
        );
      } else if (openSign.signIn && !isLogging) {
        return (
          <LoginModal closeModal={closeModalSign} switchSign={switchSign} />
        );
      } else if (openSign.signUp && !isLogging) {
        return (
          <SignupModal closeModal={closeModalSign} switchSign={switchSign} />
        );
      } else if (!loadingRequireData && isLogging && requireData) {
        return <RequireDataModal closeModal={closeModalSign} />;
      }
    }
    return (
      <div className="text-red-400 text-3xl font-bold w-full h-full flex justify-center items-center">
        <span>ERROR</span>
      </div>
    );
  }

  return (
    <>
      {children}
      {!user && (
        <>
          <Modal
            modalClassName="bg-main-background-1 w-full xs:max-w-xl xs:rounded-2xl hover-animation h-full xs:h-[unset] xs:min-h-[650px] relative px-5 xs:p-3 flex justify-center items-center"
            className={cn("flex items-center justify-center !p-0")}
            open={openSign.signIn || openSign.signUp}
            closeModal={() => {}}
            modalAnimation={variants}
          >
            {renderComponentBasedOnCondition()}
          </Modal>
          <div className="fixed inset-x-0 bottom-0 z-50 bg-accent-blue h-20 flex justify-center shadow-lg text-white">
            <div className="shrink-0 md:w-24 xl:w-full xl:max-w-[275px]" />
            <div className="w-full max-w-xl lg:max-w-[926px] flex items-center">
              <div className="hidden md:flex flex-col flex-1 overflow-hidden ">
                <p className="text-2xl font-bold truncate">
                  Don’t miss what’s happening
                </p>
                <p className="text-base truncate">
                  People on Twitter are the first to know.
                </p>
              </div>
              <div className="flex items-center justify-end font-semibold gap-3 mx-3 md:mx-0 w-full md:w-[unset] ">
                <Button
                  type="button"
                  onClick={() => {
                    setOpenSign(() => ({ signUp: false, signIn: true }));
                  }}
                  className="py-1 px-4 border-[.5px] border-white/40 hover:bg-white/20 shrink-0 flex-1 md:flex-none truncate"
                >
                  Login
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setOpenSign(() => ({ signIn: false, signUp: true }));
                  }}
                  className="py-1 px-4 bg-white text-black transition-all hover:brightness-90 active:brightness-85 shrink-0 flex-1 md:flex-none truncate"
                >
                  Sign up
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
