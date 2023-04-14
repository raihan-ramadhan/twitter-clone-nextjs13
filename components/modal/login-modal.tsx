import { XModal } from "../ui/modal/x-modal";
import { useAuth } from "../../lib/context/auth-context";
import { InputText } from "../ui/input";
import { TitleForm } from "../ui/modal/title-modal";
import { CustomIcon } from "../ui/custom-icons";
import { SwitchModal } from "../ui/modal/switch-modal";
import { OrLineModal } from "../ui/modal/or-line-modal";
import {
  ButtonHighlight,
  ButtonProvider,
  ButtonSecondary,
} from "../ui/modal/buttons-modal";

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
      <CustomIcon
        className="w-8 h-8 text-accent-blue mx-auto absolute top-5 left-1/2 -translate-x-1/2 "
        iconName="TwitterIcon"
      />
      <XModal closeModal={closeModal} />
      <div className="w-full max-w-xs mx-auto min-h-[500px] space-y-6">
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
        <OrLineModal />
        <InputText
          id="InputTextLogin"
          placeholder="Phone,email,or username"
          required
        />
        <ButtonHighlight text="Next" />
        <ButtonSecondary text="Forgot password?" />
        <SwitchModal
          switchSign={switchSign}
          textP="Don't have an account?"
          textButton="Sign up"
        />
      </div>
    </>
  );
};
