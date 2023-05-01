"use client";
// this context just for the meantime untill shallow router in next js 13 beta get better so i need this context whenever the modal like signUp, signIn, or other modal from router i/flow popup the left-nav-link will get regular not bold and solid again
import { createContext, useContext, useState } from "react";

type ShowModalContext = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ShowModalContext = createContext<ShowModalContext | null>(null);

type ShowModalProps = {
  children: React.ReactNode;
};

export function ShowModalProvider({ children }: ShowModalProps): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);

  const value: ShowModalContext = {
    showModal,
    setShowModal,
  };

  return (
    <ShowModalContext.Provider value={value}>
      {children}
    </ShowModalContext.Provider>
  );
}

export function useShowModal(): ShowModalContext {
  const context = useContext(ShowModalContext);

  if (!context)
    throw new Error("useShowModal must be used within an ShowModalProvider");

  return context;
}
