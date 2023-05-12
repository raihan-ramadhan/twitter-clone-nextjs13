import { MainLayout } from "@/components/layouts/main-layout";
import {
  RightLayout,
  ProtectedLayout,
} from "@/components/layouts/common-layout";
import { MainContainer } from "@/components/main/main-container";

export const metadata = {
  title: "Home / Twitter",
  description: "Twitter Clone NextJS-13",
};

export default function HomeLayouts({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedLayout>
      <MainLayout>
        <RightLayout searchbar trends followRec>
          <MainContainer>{children}</MainContainer>
        </RightLayout>
      </MainLayout>
    </ProtectedLayout>
  );
}
