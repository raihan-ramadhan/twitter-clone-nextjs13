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
        `flex min-h-screen w-full max-w-xl flex-col border-x-0 xs:border-x border-light-border dark:border-dark-border pb-96 relative`,
        className
      )}
    >
      {children}
    </main>
  );
}

export function DoubleContainer({
  children,
  className,
}: MainContainerProps): JSX.Element {
  return (
    <main
      className={cn(
        `flex min-h-screen w-full max-w-xl lg:max-w-[926px] flex-col border-x-0 xs:border-x border-light-border dark:border-dark-border pb-96  relative`,
        className
      )}
    >
      {children}
    </main>
  );
}
