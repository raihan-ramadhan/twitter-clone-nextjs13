import { XModal } from "../ui/modal/x-modal";
import { useAuth } from "@/lib/context/auth-context";
import { TitleModal } from "../ui/modal/title-modal";
import { CustomIcon } from "../ui/custom-icons";
import { OrLineModal } from "../ui/modal/or-line-modal";
import { SwitchModal } from "../ui/modal/switch-modal";
import { ButtonHighlight, ButtonProvider } from "../ui/modal/buttons-modal";
import { useShowModal } from "@/lib/context/show-modal-context";

export const SignupModal = ({
  closeModal,
  switchSign,
}: {
  closeModal: () => void;
  switchSign: () => void;
}): JSX.Element => {
  const { signInWithGoogle } = useAuth();
  const { setShowModal } = useShowModal();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div className="w-full xs:max-w-xl relative h-[inherit] min-h-[inherit] flex justify-center items-center">
      <CustomIcon
        className="w-8 h-8 text-accent-blue mx-auto absolute top-5 left-1/2 -translate-x-1/2 "
        iconName="TwitterIcon"
      />
      <XModal closeModal={closeModal} />
      <div className="w-full max-w-xs mx-auto min-h-[500px] space-y-6">
        <TitleModal title="Join Twitter today" className="text-3xl py-1" />
        <ButtonProvider
          callback={handleSignIn}
          text="Sign up with Google"
          provider={"google"}
        />
        <ButtonProvider text="Sign up with Apple" provider={"apple"} />
        <OrLineModal />
        <ButtonHighlight text="Create account" />
        <p className="text-sm [&>a]:span-link-accent">
          By signing up, you agree to the{" "}
          <a href="https://twitter.com/en/tos" target={"_blank"}>
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="https://twitter.com/en/privacy" target={"_blank"}>
            Privacy Policy
          </a>
          , including{" "}
          <a
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
    </div>
  );
};
