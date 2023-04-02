"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth-context";
import type { Birthdate, User } from "@/lib/types/user";

export function useRequireAuth(redirectUrl?: string): User | null {
  const { user, loading } = useAuth();
  const router = useRouter();

  let birthdate;
  if (user) birthdate = user.birthdate;

  // function checkBirthdate(birthdate: Birthdate | undefined): boolean {
  //   if (!birthdate) return false;
  //   const { month, date, year } = birthdate;
  //   return !(month === 0 || date === 0 || year === 0);
  // }

  // const requireBirtdate = checkBirthdate(birthdate);

  useEffect(() => {
    if (!loading && !user) router.push(redirectUrl ?? "/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return user;
}
