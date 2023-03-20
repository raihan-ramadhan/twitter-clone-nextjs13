import type { LayoutProps } from "./common-layout";

export function MainLayout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="flex w-full justify-center">
      <header className="bg-gray-400 flex shrink-0 w-0 xs:w-20 md:w-24 lg:max-w-none xl:w-full xl:max-w-xs p-4">
        NAV
      </header>
      {children}
    </div>
  );
}
