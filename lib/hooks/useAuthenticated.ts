"use client";
import { useRouter, usePathname } from "next/navigation";
import type { User } from "@/lib/types/user";
import { useAuth } from "../context/auth-context";

export function useAuthenticated(redirectUrl?: string): {
  user: User | null;
  loading: boolean;
} {
  const { user, loading } = useAuth();
  const asPathname = usePathname();
  const router = useRouter();

  if (user && asPathname === "/") router.push(redirectUrl ?? "/home");

  return { user, loading };
}
