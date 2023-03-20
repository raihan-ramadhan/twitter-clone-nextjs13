import type { ReactNode } from "react";

export type LayoutProps = {
  children: ReactNode;
};

export function HomeLayout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      {children}
      <div className="hidden lg:block w-96 bg-blue-300 ml-4 p-4">KANAN</div>
    </>
  );
}
