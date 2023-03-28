"use client";
import { Modal } from "../modal/modal";
import { useState } from "react";
import { LoginModal } from "../modal/login-modal";
import { SignupModal } from "../modal/signup-modal";
import { Button } from "../ui/button";
import { useWindow } from "@/lib/context/window-context";
import cn from "clsx";

type OpenState = {
  signIn: boolean;
  signUp: boolean;
};

const initialOpenSign = {
  signIn: false,
  signUp: false,
};

export const BottomLogin = (): JSX.Element => {
  const { isMobile } = useWindow();
  const [openSign, setOpenSign] = useState<OpenState>(initialOpenSign);

  const closeModalSign: () => void = () => {
    setOpenSign(initialOpenSign);
    return "sjdhs";
  };
  const switchSign: () => void = () => {
    setOpenSign((prev) => {
      return prev.signIn
        ? {
            signIn: false,
            signUp: true,
          }
        : {
            signIn: true,
            signUp: false,
          };
    });
  };

  return (
    <>
      <Modal
        modalClassName="bg-main-background-1 w-full xs:max-w-xl xs:rounded-2xl xs:p-3 hover-animation h-full xs:h-[unset]"
        className={cn("flex items-center justify-center", isMobile && "!p-0")}
        open={openSign.signIn || openSign.signUp}
        closeModal={() => {}}
      >
        {openSign.signIn ? (
          <LoginModal closeModal={closeModalSign} switchSign={switchSign} />
        ) : (
          <SignupModal closeModal={closeModalSign} switchSign={switchSign} />
        )}
      </Modal>

      <div className="fixed inset-x-0 bottom-0 bg-accent-blue h-20 z-50 flex justify-center shadow-lg text-white">
        <div className="shrink-0 xs:w-20 md:w-24 xl:w-full xl:max-w-[275px]" />
        <div className="w-full max-w-xl flex flex-col justify-center items-start">
          <p className="text-2xl font-bold">Don’t miss what’s happening</p>
          <p className="text-base">People on Twitter are the first to know.</p>
        </div>
        <div className="hidden lg:flex w-[350px] items-center justify-end font-semibold gap-3">
          <Button
            type="button"
            onClick={() =>
              setOpenSign((prev) => ({ signUp: false, signIn: true }))
            }
            className="py-1 px-4 border-[.5px] border-white/40 hover:bg-white/20"
          >
            Login
          </Button>
          <Button
            type="button"
            onClick={() =>
              setOpenSign((prev) => ({ signIn: false, signUp: true }))
            }
            className="py-1 px-4 bg-white text-black transition-all hover:brightness-90 active:brightness-85"
          >
            Sign up
          </Button>
        </div>
      </div>
    </>
  );
};
