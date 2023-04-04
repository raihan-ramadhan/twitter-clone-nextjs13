import { XForm } from "../form/x-form";
import { useAuth } from "../../lib/context/auth-context";
import { TitleForm } from "../form/title-form";
import { InputForm } from "../form/input-form";
import { SwitchForm } from "../form/switch-form";
import { OrLineForm } from "../form/or-line-form";
import {
  ButtonHighlight,
  ButtonProvider,
  ButtonSecondary,
} from "../form/buttons-form";

export const LoginModal = ({
  closeModal,
  switchSign,
}: {
  closeModal: () => void;
  switchSign: () => void;
}): JSX.Element => {
  const { signInWithGoogle } = useAuth();

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center relative p-5 py-14">
        <XForm closeModal={closeModal} />
        <form className="w-full max-w-xs mx-auto space-y-6 ">
          <TitleForm title={"Sign in to Twitter"} />
          <ButtonProvider
            callback={signInWithGoogle}
            text="Sign in with Google"
            provider={"google"}
          />
          <ButtonProvider
            callback={() => alert("Coming Soon")}
            text="Sign in with Apple"
            provider={"apple"}
          />
          <OrLineForm />
          <InputForm placeholder="Phone,email,or username" />
          <ButtonHighlight text="Next" />
          <ButtonSecondary text="Forgot password?" />
          <SwitchForm
            switchSign={switchSign}
            textP="Don't have an account?"
            textButton="Sign up"
          />
        </form>
      </div>
    </>
  );
};
