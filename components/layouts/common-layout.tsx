"use client";
import { Right } from "../right/right";
import { Placeholder } from "../common/placeholder";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";

import type { ReactNode } from "react";

export type LayoutProps = {
  children: ReactNode;
};

export function ProtectedLayout({ children }: LayoutProps): JSX.Element {
  const { user } = useRequireAuth();

  if (!user) return <Placeholder />;

  return <>{children}</>;
}

export function HomeLayout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      {children}
      <div className="hidden w-[350px] lg:block p-3">
        <Right />
      </div>
    </>
  );
}
