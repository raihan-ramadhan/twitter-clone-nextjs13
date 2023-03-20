import { MainContainer } from "@/components/home/main-container";
import { HomeLayout } from "@/components/layouts/common-layout";
import { MainLayout } from "@/components/layouts/main-layout";

export default function RootPage() {
  return (
    <MainLayout>
      <HomeLayout>
        <MainContainer>
          <div className="p-4">/</div>
        </MainContainer>
      </HomeLayout>
    </MainLayout>
  );
}
