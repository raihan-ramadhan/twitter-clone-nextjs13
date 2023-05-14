"use client";
import { Right } from "../right/right";
import { Placeholder } from "../common/placeholder";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";

import type { ReactNode } from "react";

export type LayoutProps = {
  children: ReactNode;
};

export type RightProps = {
  searchbar?: boolean;
  trends?: boolean;
  followRec?: boolean;
  mightLike?: boolean;
  photos?: boolean;
};

export type RightLayoutProps = LayoutProps & RightProps;

export function ProtectedLayout({ children }: LayoutProps): JSX.Element {
  const { user } = useRequireAuth();

  if (!user) return <Placeholder />;

  return <>{children}</>;
}

export function RightLayout({
  children,
  ...rest
}: RightLayoutProps): JSX.Element {
  return (
    <>
      {children}
      <div tabIndex={0} className="hidden w-[350px] lg:flex lg:flex-col">
        <Right {...{ ...rest }} />
      </div>
    </>
  );
}
