"use client";
import { RequireFormModal } from "../modal/require-form-modal";
import { useWindow } from "@/lib/context/window-context";
import { Variants } from "framer-motion";
import { useAuth } from "@/lib/context/auth-context";
import { Modal } from "../modal/modal";
import cn from "clsx";
import type { LayoutProps } from "./common-layout";

export const RequireFormLayout = ({ children }: LayoutProps): JSX.Element => {
  const { isMobile } = useWindow();
  const { user, loading } = useAuth();

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

  return (
    <>
      {user && !loading && (
        <Modal
          className={cn("flex items-center", isMobile && "!p-0")}
          modalClassName="bg-main-background-1 w-full xs:max-w-xl xs:rounded-2xl xs:p-3 hover-animation h-full max-h-[550px] mx-auto"
          modalAnimation={variants}
          closeModal={() => {}}
          open={false} // akan show jika RequireFormModal belum di submit
        >
          <RequireFormModal />
        </Modal>
      )}
      {children}
    </>
  );
};
