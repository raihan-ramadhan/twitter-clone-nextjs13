import "../styles/globals.scss";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { ThemeContextProvider } from "@/lib/context/theme-context";
import { AuthContextProvider } from "@/lib/context/auth-context";

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
          <AuthContextProvider>
            <ThemeContextProvider>
              {children}
            </ThemeContextProvider>
          </AuthContextProvider>
        </WindowContextProvider>
      </body>
    </html>
  );
}
