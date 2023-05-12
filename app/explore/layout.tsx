import { MainLayout } from "@/components/layouts/main-layout";
import { RightLayout } from "@/components/layouts/common-layout";
import { MainContainer } from "@/components/main/main-container";
import { AuthLayout } from "@/components/layouts/auth-layout";

export const metadata = {
  title: "Explore / Twitter",
  description: "Twitter Clone NextJS-13",
};

export default function ExploreLayouts({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthLayout>
      <MainLayout>
        <RightLayout followRec>
          <MainContainer>{children}</MainContainer>
        </RightLayout>
      </MainLayout>
    </AuthLayout>
  );
}
