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
        `flex min-h-screen w-full max-w-xl flex-col border-x-0 pb-96  xs:border-x relative`,
        className
      )}
    >
      {children}
    </main>
  );
}
