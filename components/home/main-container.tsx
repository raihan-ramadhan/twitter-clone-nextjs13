import cn from "clsx";
import type { ReactNode } from "react";

type MainContainerProps = {
  children: ReactNode;
  className?: string;
};

export function MainContainer({
  children,
  className,
}: MainContainerProps): JSX.Element {
  return (
    <main
      className={cn(
        `flex min-h-screen bg-blue-500 w-full max-w-xl flex-col border-x-0
           border-light-border pb-96 dark:border-dark-border xs:border-x`,
        className
      )}
    >
      {children}
    </main>
  );
}
