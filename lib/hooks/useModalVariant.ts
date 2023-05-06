import { Variants } from "framer-motion";
import { useWindow } from "../context/window-context";

export default function useModalVariant() {
  const { isMobile } = useWindow();

  const variant: Variants = isMobile
    ? {
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: { duration: 0.2 },
        },
        exit: { opacity: 0, transition: { duration: 0.15 } },
      }
    : {
        initial: { opacity: 0, scale: 0.8 },
        animate: {
          opacity: 1,
          scale: 1,
          transition: { type: "spring", duration: 0.5, bounce: 0.4 },
        },
        exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
      };

  return variant;
}
