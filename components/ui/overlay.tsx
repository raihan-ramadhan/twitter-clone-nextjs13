import cn from "clsx";

export const Overlay = ({
  open,
  backgroundColor,
  zIndex,
}: {
  open: boolean;
  backgroundColor?: string;
  zIndex?: string;
}): JSX.Element => {
  return (
    <div
      className={cn(
        "fixed inset-0 ",
        open ? "block" : "hidden",
        backgroundColor ?? "bg-transparent",
        zIndex ?? "z-0"
      )}
    />
  );
};
