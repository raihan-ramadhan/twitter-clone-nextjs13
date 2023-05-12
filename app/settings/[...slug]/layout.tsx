import { MainLayout } from "@/components/layouts/main-layout";
import { DoubleContainer } from "@/components/main/main-container";
import { AuthLayout } from "@/components/layouts/auth-layout";

export const metadata = {
  title: "Home / Twitter",
  description: "Twitter Clone NextJS-13",
};

export default function SettingsLayouts({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthLayout>
      <MainLayout>
        <DoubleContainer>{children}</DoubleContainer>
      </MainLayout>
    </AuthLayout>
  );
}
