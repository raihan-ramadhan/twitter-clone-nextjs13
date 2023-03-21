import Left from "../left/left";
import type { LayoutProps } from "./common-layout";

export function MainLayout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="flex w-full justify-center">
      <Left />
      {children}
    </div>
  );
}
