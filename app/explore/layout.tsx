import { MainLayout } from "@/components/layouts/main-layout";
import { HomeLayout } from "@/components/layouts/common-layout";
import { MainContainer } from "@/components/main/main-container";
import { AuthLayout } from "@/components/layouts/auth-layout";

export const metadata = {
  title: "Explore / Twitter",
  description: "Twitter Clone NextJS-13",
};

export default function HomeLayouts({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthLayout>
      <MainLayout>
        <HomeLayout>
          <MainContainer>{children}</MainContainer>
        </HomeLayout>
      </MainLayout>
    </AuthLayout>
  );
}