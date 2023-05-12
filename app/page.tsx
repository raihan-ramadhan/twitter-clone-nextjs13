import { AuthLayout } from "@/components/layouts/auth-layout";
import { MainLayout } from "@/components/layouts/main-layout";
import { RightLayout } from "@/components/layouts/common-layout";
import { MainContainer } from "@/components/main/main-container";

export default function RootPage() {
  // prettier-ignore
  return (
    <AuthLayout> {/*Where we place signIn/signUp and redirect to /home*/}
      <MainLayout> {/*Where we place the left*/}
        <RightLayout> {/*Where we place the right*/}
          <MainContainer> {/*Container main*/}
            <div className="p-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, optio porro veniam dolorem in magni soluta recusandae inventore? Repellat, architecto?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, optio porro veniam dolorem in magni soluta recusandae inventore? Repellat, architecto?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, optio porro veniam dolorem in magni soluta recusandae inventore? Repellat, architecto?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, optio porro veniam dolorem in magni soluta recusandae inventore? Repellat, architecto?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, optio porro veniam dolorem in magni soluta recusandae inventore? Repellat, architecto?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, optio porro veniam dolorem in magni soluta recusandae inventore? Repellat, architecto?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, optio porro veniam dolorem in magni soluta recusandae inventore? Repellat, architecto?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, optio porro veniam dolorem in magni soluta recusandae inventore? Repellat, architecto?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, optio porro veniam dolorem in magni soluta recusandae inventore? Repellat, architecto?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, optio porro veniam dolorem in magni soluta recusandae inventore? Repellat, architecto?
            </div>
          </MainContainer>
        </RightLayout>
      </MainLayout>
    </AuthLayout>
  );
}
