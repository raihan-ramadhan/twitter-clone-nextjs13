import "./styles/globals.css";
import { MainLayout } from "@/components/layouts/main-layout";
import { HomeLayout } from "@/components/layouts/common-layout";

export const metadata = {
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
        <MainLayout>
          <HomeLayout>{children}</HomeLayout>
        </MainLayout>
      </body>
    </html>
  );
}
