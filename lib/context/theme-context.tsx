"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, createContext, useContext } from "react";
import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
} from "next-themes";

import { useAuth } from "./auth-context";
import { updateUserTheme } from "../firebase/utils";

import type { Theme, Accent } from "@/lib/types/theme";
import type { ReactNode, ChangeEvent } from "react";

type ThemeContext = {
  theme: Theme;
  accent: Accent;
  changeTheme: ({ target: { value } }: ChangeEvent<HTMLInputElement>) => void;
  changeAccent: ({ target: { value } }: ChangeEvent<HTMLInputElement>) => void;
};

export const ThemeContext = createContext<ThemeContext | null>(null);

type ThemeContextProviderProps = {
  children: ReactNode;
};

function setInitialTheme(savedTheme: Theme): Theme {
  if (typeof window === "undefined") return "light";

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return savedTheme ?? (prefersDark ? "dark" : "light");
}

function setInitialAccent(): Accent {
  if (typeof window === "undefined") return "blue";

  const savedAccent = localStorage.getItem("accent") as Accent | null;

  return savedAccent ?? "blue";
}

function ThemeContextProvider({
  children,
}: ThemeContextProviderProps): JSX.Element {
  const { setTheme: setNextTheme, resolvedTheme } = useNextTheme();
  const savedTheme = resolvedTheme as Theme;

  const [theme, setTheme] = useState<Theme>(() => setInitialTheme(savedTheme));
  const [accent, setAccent] = useState<Accent>(setInitialAccent);

  const { user } = useAuth();
  const { id: userId, theme: userTheme, accent: userAccent } = user ?? {};

  useEffect(() => {
    if (user && userTheme) {
      setTheme(userTheme);
      setNextTheme(userTheme);
    }
  }, [userId, userTheme]);

  useEffect(() => {
    if (user && userAccent) setAccent(userAccent);
  }, [userId, userAccent]);

  useEffect(() => {
    const flipTheme = (theme: Theme): NodeJS.Timeout | undefined => {
      const root = document.documentElement;

      if (theme === "dim" || theme === "dark") {
        root.setAttribute("data-theme", "dark");
      } else root.removeAttribute("data-theme");

      if (user) {
        return setTimeout(() => void updateUserTheme(user.id, { theme }), 500);
      }

      return undefined;
    };

    const timeoutId = flipTheme(theme);
    return () => clearTimeout(timeoutId);
    // if we unmount page it will make setTimeout still working in
    // 500ms later so we need clear it before unMount page as a cleanup useEffect
  }, [userId, theme]);

  useEffect(() => {
    if (!user) {
      setAccent("blue");
      localStorage.setItem("accent", "blue");
    }
  }, [userId]);

  useEffect(() => {
    const flipAccent = (accent: Accent): NodeJS.Timeout | undefined => {
      const root = document.documentElement;

      root.style.setProperty("--main-accent", `var(--accent-${accent})`);

      if (user) {
        localStorage.setItem("accent", accent);
        return setTimeout(() => void updateUserTheme(user.id, { accent }), 500);
      }

      return undefined;
    };

    const timeoutId = flipAccent(accent);
    return () => clearTimeout(timeoutId);
    // if we unmount page it will make setTimeout still working in
    // 500ms later so we need clear it before unMount page as a cleanup useEffect
  }, [userId, accent]);

  const changeTheme = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void => {
    setNextTheme(value as Theme);
    setTheme(value as Theme);
  };

  const changeAccent = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void => setAccent(value as Accent);

  const value: ThemeContext = {
    theme,
    accent,
    changeTheme,
    changeAccent,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function NextThemeContextProvider({
  children,
}: ThemeContextProviderProps): JSX.Element {
  return (
    <NextThemesProvider
      themes={["light", "dark", "dim"]}
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <ThemeContextProvider>{children}</ThemeContextProvider>
    </NextThemesProvider>
  );
}

export function useTheme(): ThemeContext {
  const context = useContext(ThemeContext);

  if (!context)
    throw new Error("useTheme must be used within an ThemeContextProvider");

  return context;
}
