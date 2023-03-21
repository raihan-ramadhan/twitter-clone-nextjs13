import "../styles/globals.scss";
import type { Metadata } from "next";

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
      <body className="px-0 xs:px-4 bg-gray-500">{children}</body>
    </html>
  );
}
