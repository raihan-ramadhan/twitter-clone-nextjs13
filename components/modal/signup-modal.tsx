import { ButtonHighlight, ButtonProvider } from "../form-sign/buttons-form";
import { OrLineForm } from "../form-sign/or-line-form";
import { SwitchForm } from "../form-sign/switch-form";
import { TitleForm } from "../form-sign/title-form";
import { XForm } from "../form-sign/x-form";
import { CustomIcon } from "../ui/custom-icons";

export const SignupModal = ({
  closeModal,
  switchSign,
}: {
  closeModal: () => void;
  switchSign: () => void;
}): JSX.Element => {
  return (
    <>
      <div className="p-5 w-full h-full flex flex-col justify-center items-center relative py-14">
        <XForm closeModal={closeModal} />
        <CustomIcon
          className="w-8 h-8 text-accent-blue mx-auto absolute top-3 left-1/2 -translate-x-1/2 "
          iconName="TwitterIcon"
        />
        <form className="w-full max-w-xs mx-auto space-y-6 ">
          <TitleForm title="Join Twitter today" />
          <ButtonProvider text="Sign up with Google" provider={"google"} />
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
