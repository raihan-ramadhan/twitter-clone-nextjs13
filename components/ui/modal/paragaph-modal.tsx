import cn from "clsx";
export const ParagraphModal = ({
  text,
  className,
  secondary = false,
}: {
  text: string | JSX.Element;
  className?: string;
  secondary?: boolean;
}): JSX.Element => {
  return (
    <p
      className={cn(
        "text-light-secondary",
        className ?? "text-base",
        secondary ? "dark:text-dark-secondary" : "dark:text-light-line-reply"
      )}
    >
      <>{text}</>
    </p>
  );
};
