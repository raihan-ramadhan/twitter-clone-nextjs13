import { Button } from "../ui/button";
import { CustomIcon } from "../ui/custom-icons";
import { HeroIcon } from "../ui/hero-icon";

export const LoginModal = ({
  closeModal,
  switchSign,
}: {
  closeModal: () => void;
  switchSign: () => void;
}): JSX.Element => {
  return (
    <>
      <div className="p-5 w-full h-full flex flex-col justify-center items-center relative py-14">
        <Button
          tabIndex={0}
          className="absolute top-0 left-0 cursor-pointer main-tab rounded-full p-2 hover:bg-main-background-3 focus-visible:bg-main-background-3 hover-animation"
          onClick={closeModal}
        >
          <HeroIcon iconName="XMarkIcon" className="h-5 w-5" />
        </Button>

        <CustomIcon
          className="w-8 h-8 text-accent-blue mx-auto absolute top-3 left-1/2 -translate-x-1/2 "
          iconName="TwitterIcon"
        />
        <form className="w-full max-w-xs mx-auto space-y-6 ">
          <h2 className="text-3xl font-semibold py-2">Sign in to Twitter</h2>
          <Button className="w-full font-semibold py-1 flex items-center justify-center gap-3 border border-light-line-reply dark:border-light-secondary">
            <CustomIcon iconName="GoogleIcon" className="h-5 w-5" />
            <span>Sign in with Google</span>
          </Button>
          <Button className="w-full font-semibold py-1 flex items-center justify-center gap-3 border border-light-line-reply dark:border-light-secondary">
            <CustomIcon iconName="AppleIcon" className="h-5 w-5" />
            <span>Sign in with Apple</span>
          </Button>
          <div className="relative">
            <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 px-2 bg-main-background-1 z-50">
              or
            </span>
            <hr className="border-t-light-line-reply dark:border-t-light-secondary z-0" />
          </div>

          <div className="flex justify-center">
            <div
              className="relative w-full text-light-secondary dark:text-light-secondary"
              data-te-input-wrapper-init
            >
              <input
                type="text"
                className="peer p-2 pt-6 w-full text-lg rounded-md border border-light-line-reply dark:border-light-secondary bg-transparent transition-all duration-200 ease-linear motion-reduce:transition-none focus:outline-accent-blue focus:border-accent-blue"
                id="formControlInputText"
                required
              />
              <label
                htmlFor="formControlInputText"
                className="pointer-events-none absolute text-lg top-1/2 -translate-y-1/2 left-2 mb-0 max-w-[90%] origin-[0_0] truncate transition-all duration-200 ease-out peer-valid:top-1 peer-focus:top-1 peer-valid:translate-y-[unset] peer-focus:translate-y-[unset] peer-valid:scale-[0.8] peer-focus:scale-[0.8] peer-focus:text-accent-blue peer-data-[te-input-state-active]:top-1 peer-data-[te-input-state-active]:translate-y-[unset] peer-data-[te-input-state-active]:scale-[0.8] peer-data motion-reduce:transition-none dark:peer-focus:text-light-secondary"
              >
                Phone,email,or username
              </label>
            </div>
          </div>
          <Button className="w-full font-semibold py-1 border border-light-line-reply dark:border-light-secondary text-center bg-black text-white">
            Next
          </Button>
          <Button className="w-full font-semibold py-1 border border-light-line-reply dark:border-light-secondary text-center">
            Forgot password?
          </Button>
          <div className="flex gap-1 items-center pt-6">
            Don't have an account?
            <button
              onClick={switchSign}
              type="button"
              className="hover:underline- transition-colors duration-200 text-accent-blue"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
