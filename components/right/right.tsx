import { useAuth } from "@/lib/context/auth-context";
import { ButtonProvider, ButtonSecondary } from "../ui/modal/buttons-modal";
import { useShowModal } from "@/lib/context/show-modal-context";
import { RightMore } from "./right-more";

export const Right = () => {
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
    <>
      <div className="w-full border border-light-border dark:border-dark-border rounded-2xl p-3 space-y-3">
        <div>
          <span className="text-xl leading-none font-bold">
            New to Twitter?
          </span>
          <br />
          <span className="text-light-secondary dark:text-dark-secondary text-sm">
            Sign up now to get your own personalized timeline!
          </span>
        </div>
        <div className="space-y-3">
          <ButtonProvider
            callback={handleSignIn}
            text="Sign in with Google"
            provider={"google"}
            className="py-2"
          />
          <ButtonProvider
            callback={() => alert("Coming Soon")}
            text="Sign in with Apple"
            provider={"apple"}
            className="py-2"
          />
          <ButtonSecondary
            text={"Create Account"}
            callback={() => console.log("TEST")}
            className="py-2"
          />
        </div>
        <div>
          <p className="text-sm text-light-secondary dark:text-dark-secondary [&>a]:span-link-accent">
            By signing up, you agree to the{" "}
            <a href="https://twitter.com/en/tos" target="_blank">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="https://twitter.com/en/privacy" target="_blank">
              Privacy Policy
            </a>
            , including{" "}
            <a
              href="https://help.twitter.com/en/rules-and-policies/twitter-cookies"
              target="_blank"
            >
              Cookie Use.
            </a>
          </p>
        </div>
      </div>
      <nav className="text-sm leading-relaxed p-3 [&>a]:span-link-secondary text-light-secondary dark:text-dark-secondary [&>*]:mr-3 [&>*]:inline-block">
        <a href="https://twitter.com/en/tos" target="_blank">
          Terms of Service
        </a>
        <a href="https://twitter.com/en/privacy" target="_blank">
          Privacy Policy
        </a>
        <a
          href="https://help.twitter.com/en/rules-and-policies/twitter-cookies"
          target="_blank"
        >
          Cookie Policy
        </a>
        <a
          href="https://help.twitter.com/en/resources/accessibility"
          target="_blank"
        >
          Accessibility
        </a>
        <a
          href="https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=adsinfo"
          target="_blank"
        >
          Ads info
        </a>
        <RightMore />
        <span>© 2023 Twitter Clone.</span>
      </nav>
    </>
  );
};
