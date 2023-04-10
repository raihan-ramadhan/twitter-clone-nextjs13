import { XModal } from "../ui/modal/x-modal";
import { useAuth } from "@/lib/context/auth-context";
import { TitleForm } from "../ui/modal/title-modal";
import { CustomIcon } from "../ui/custom-icons";
import { OrLineModal } from "../ui/modal/or-line-modal";
import { SwitchModal } from "../ui/modal/switch-modal";
import { ButtonHighlight, ButtonProvider } from "../ui/modal/buttons-modal";

export const SignupModal = ({
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
        <TitleForm title="Join Twitter today" />
        <ButtonProvider
          callback={signInWithGoogle}
          text="Sign up with Google"
          provider={"google"}
        />
        <ButtonProvider text="Sign up with Apple" provider={"apple"} />
        <OrLineModal />
        <ButtonHighlight text="Create account" />
        <p className="text-sm">
          By signing up, you agree to the{" "}
          <a
            className="span-link"
            href="https://twitter.com/en/tos"
            target={"_blank"}
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            className="span-link"
            href="https://twitter.com/en/privacy"
            target={"_blank"}
          >
            Privacy Policy
          </a>
          , including{" "}
          <a
            className="span-link"
            href="https://help.twitter.com/en/rules-and-policies/twitter-cookies"
            target={"_blank"}
          >
            Cookie Use
          </a>
          .
        </p>
        <SwitchModal
          switchSign={switchSign}
          textP="Have an account already?"
          textButton="Log In"
        />
      </div>
    </>
  );
};
