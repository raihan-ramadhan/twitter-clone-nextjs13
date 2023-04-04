import "../styles/globals.scss";
import dynamic from "next/dynamic";
import { ThemeContextProvider } from "@/lib/context/theme-context";
import { AuthContextProvider } from "@/lib/context/auth-context";
import { RequireDataProvider } from "@/lib/context/require-data-context";
import type { Metadata } from "next";

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
      <body>
        <WindowContextProvider>
          <RequireDataProvider>
            <AuthContextProvider>
              <ThemeContextProvider>
                {children}
              </ThemeContextProvider>
            </AuthContextProvider>
          </RequireDataProvider>
        </WindowContextProvider>
      </body>
    </html>
  );
}
