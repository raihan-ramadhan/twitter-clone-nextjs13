import cn from "clsx";
export const TitleForm = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}): JSX.Element => {
  return (
    <>
      <h2 className={cn("font-semibold", className ?? "text-2xl py-2")}>
        {title}
      </h2>
    </>
  );
};
export const SubTitleModal = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}): JSX.Element => {
  return (
    <>
      <h2 className={cn("font-semibold", className ?? "text-xl py-2")}>
        {title}
      </h2>
    </>
  );
};
