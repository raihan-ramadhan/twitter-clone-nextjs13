"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth-context";
import type { User } from "@/lib/types/user";

export function useRequireAuth(redirectUrl?: string): User | null {
  // const { user, loading } = { user: null, loading: null };
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push(redirectUrl ?? "/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return user;
}
