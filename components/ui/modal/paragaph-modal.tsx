import cn from "clsx";
export const ParagraphModal = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}): JSX.Element => {
  return (
    <p
      className={cn(
        "text-light-secondary dark:text-light-line-reply",
        className ?? "text-base"
      )}
    >
      {text}
    </p>
  );
};
