import { MainLayout } from "@/components/layouts/main-layout";

export const metadata = {
  title: "Home / Twitter",
  description: "Twitter Clone NextJS-13",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
