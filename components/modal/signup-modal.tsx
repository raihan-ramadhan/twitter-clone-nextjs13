import { XForm } from "../ui/form/x-form";
import { useAuth } from "@/lib/context/auth-context";
import { TitleForm } from "../ui/form/title-form";
import { OrLineForm } from "../ui/form/or-line-form";
import { SwitchForm } from "../ui/form/switch-form";
import { ButtonHighlight, ButtonProvider } from "../ui/form/buttons-form";

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
      <div className="p-5 w-full h-full flex flex-col justify-center items-center relative py-14">
        <XForm closeModal={closeModal} />
        <form className="w-full max-w-xs mx-auto space-y-6">
          <TitleForm title="Join Twitter today" />
          <ButtonProvider
            callback={signInWithGoogle}
            text="Sign up with Google"
            provider={"google"}
          />
          <ButtonProvider text="Sign up with Apple" provider={"apple"} />
          <OrLineForm />
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
          <SwitchForm
            switchSign={switchSign}
            textP="Have an account already?"
            textButton="Log In"
          />
        </form>
      </div>
    </>
  );
};
