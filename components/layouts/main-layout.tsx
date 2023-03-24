import Left from "../left/left";
import type { LayoutProps } from "./common-layout";

export function MainLayout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="flex w-full justify-center bg-gray-700">
      <Left />
      {children}
    </div>
  );
}
