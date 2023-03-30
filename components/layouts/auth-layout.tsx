"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { sleep } from "@/lib/utils";
import { Placeholder } from "@/components/common/placeholder";
import type { LayoutProps } from "./common-layout";
import { useAuth } from "@/lib/context/auth-context";

export function AuthLayout({ children }: LayoutProps): JSX.Element {
  const [pending, setPending] = useState(true);

  const { user, loading } = useAuth();
  // const { user, loading } = { user: null, loading: null };
  const router = useRouter();

  console.log("at file AuthLayout", user);

  useEffect(() => {
    const checkLogin = async (): Promise<void> => {
      setPending(true);

      if (user) {
        await sleep(500);
        router.push("/home");
      } else if (!loading) {
        await sleep(500);
        setPending(false);
      }
    };

    void checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  if (loading || pending) return <Placeholder />;

  return <>{children}</>;
}
