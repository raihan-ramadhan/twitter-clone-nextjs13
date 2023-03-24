import "../styles/globals.scss";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

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
      <body className="px-0 xs:px-4">
        <WindowContextProvider>{children}</WindowContextProvider>
      </body>
    </html>
  );
}
