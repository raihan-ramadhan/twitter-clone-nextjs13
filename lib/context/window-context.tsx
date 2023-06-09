"use client";
import {
  useState,
  useContext,
  useEffect,
  createContext,
  useLayoutEffect,
} from "react";
import type { ReactNode } from "react";

type WindowSize = {
  width: number;
  height: number;
};

type WindowContext = WindowSize & {
  isMobile: boolean;
  isBigMobile: boolean;
};

export const WindowContext = createContext<WindowContext | null>(null);

type WindowContextProviderProps = {
  children: ReactNode;
};

export default function WindowContextProvider({
  children,
}: WindowContextProviderProps): JSX.Element {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = (): void => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useLayoutEffect(() => {
    // this make first value innerWidth and innerHeight in nextjs correct
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const value: WindowContext = {
    ...windowSize,
    isMobile: windowSize.width < 500,
    isBigMobile: windowSize.width < 640,
  };

  return (
    <WindowContext.Provider value={value}>{children}</WindowContext.Provider>
  );
}

export function useWindow(): WindowContext {
  const context = useContext(WindowContext);

  if (!context)
    throw new Error("useWindow must be used within an WindowContextProvider");

  return context;
}
