import "../styles/globals.css";
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
      <body className="px-4">{children}</body>
    </html>
  );
}
