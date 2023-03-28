import cn from "clsx";

export const Overlay = ({
  open,
  close,
  backgroundColor,
  zIndex,
}: {
  close?: () => void;
  open: boolean;
  backgroundColor?: string;
  zIndex?: string;
}): JSX.Element => {
  return (
    <div
      onClick={close}
      className={cn(
        "fixed inset-0 ",
        open ? "block" : "hidden",
        backgroundColor ?? "bg-transparent",
        zIndex ?? "z-0"
      )}
    />
  );
};
