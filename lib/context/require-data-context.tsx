"use client";
import { useState, createContext, useContext } from "react";

import type { ReactNode } from "react";
import type { RequireData } from "../types/requireData";

type RequireDataContext = {
  setRequireData: React.Dispatch<React.SetStateAction<RequireData>>;
  setIsLogging: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  requireData: RequireData;
  isLogging: boolean;
  loading: boolean;
};

export const RequireDataContext = createContext<RequireDataContext | null>(
  null
);

type RequireDataProviderProps = {
  children: ReactNode;
};

export function RequireDataProvider({
  children,
}: RequireDataProviderProps): JSX.Element {
  const [requireData, setRequireData] = useState<RequireData>(null);
  const [isLogging, setIsLogging] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const value: RequireDataContext = {
    setRequireData,
    setIsLogging,
    setLoading,
    requireData,
    isLogging,
    loading,
  };

  return (
    <RequireDataContext.Provider value={value}>
      {children}
    </RequireDataContext.Provider>
  );
}

export function useRequireData() {
  const context = useContext(RequireDataContext);

  if (!context)
    throw new Error(
      "useRequireData must be used within an RequireDataProvider"
    );

  return context;
}
