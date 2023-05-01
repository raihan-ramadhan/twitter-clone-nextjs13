import "../styles/globals.scss";
import dynamic from "next/dynamic";

import { AuthContextProvider } from "@/lib/context/auth-context";
import { RequireDataProvider } from "@/lib/context/require-data-context";
import { NextThemeContextProvider } from "@/lib/context/theme-context";

import type { Metadata } from "next";
import { ShowModalProvider } from "@/lib/context/show-modal-context";

const WindowContextProvider = dynamic(
  () => import("../lib/context/window-context"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Index / Twitter",
  description: "Twitter Clone NextJS-13",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // prettier-ignore
  // we place all context in this root layout
  return (
    <html lang="en">
      <RequireDataProvider>
        <AuthContextProvider>
          <body>
            <NextThemeContextProvider>
              <WindowContextProvider>
                <ShowModalProvider>
                  {children}
                </ShowModalProvider>
              </WindowContextProvider>
            </NextThemeContextProvider>
          </body>
        </AuthContextProvider>
      </RequireDataProvider>
    </html>
  );
}
