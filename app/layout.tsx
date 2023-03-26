import "../styles/globals.scss";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { ThemeContextProvider } from "@/lib/context/theme-context";

const WindowContextProvider = dynamic(
  () => import("../lib/context/window-context"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Home / Twitter",
  description: "Twitter Clone NextJS-13",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WindowContextProvider>
          <ThemeContextProvider>{children}</ThemeContextProvider>
        </WindowContextProvider>
      </body>
    </html>
  );
}
