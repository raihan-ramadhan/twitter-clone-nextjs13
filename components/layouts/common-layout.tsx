"use client";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import type { ReactNode } from "react";
import { Placeholder } from "../common/placeholder";

export type LayoutProps = {
  children: ReactNode;
};

export function ProtectedLayout({ children }: LayoutProps): JSX.Element {
  const user = useRequireAuth();

  if (!user) return <Placeholder />;

  return <>{children}</>;
}

export function HomeLayout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      {children}
      <div className="hidden lg:block w-[350px]">RIGHT</div>
    </>
  );
}
