"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth-context";
import type { User } from "@/lib/types/user";

export function useRequireAuth(redirectUrl?: string): {
  user: User | null;
  loading: boolean;
} {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push(redirectUrl ?? "/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return { user, loading };
}
