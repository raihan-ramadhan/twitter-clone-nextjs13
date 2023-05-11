import cn from "clsx";
export const TitleModal = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}): JSX.Element => {
  return (
    <>
      <h2 className={cn("font-bold", className ?? "text-2xl py-2")}>{title}</h2>
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
      <h3 className={cn("font-semibold", className ?? "text-xl py-2")}>
        {title}
      </h3>
    </>
  );
};
