import { ButtonHighlight, ButtonSecondary } from "../ui/modal/buttons-modal";
import { CustomIcon } from "../ui/custom-icons";

type SignoutProps = {
  closeModal: () => void;
  signOut: () => Promise<void>;
};

export const SignoutModal = ({
  closeModal,
  signOut,
}: SignoutProps): JSX.Element => {
  return (
    <div className="flex flex-col w-full items-center gap-3">
      <CustomIcon className="w-8 h-8 text-accent-blue" iconName="TwitterIcon" />
      <div>
        <h2 className="font-bold text-start w-full text-xl">
          Log out of Twitter?
        </h2>
        <p className="text-start text-dark-border dark:text-light-border ">
          You can always log back in at any time. If you just want to switch
          accounts, you can do that by adding an existing account.
        </p>
      </div>
      <ButtonHighlight
        callback={signOut}
        text="Log Out"
        className="text-lg p-2"
      />
      <ButtonSecondary
        callback={closeModal}
        text="Cancel"
        className="text-lg p-2"
      />
    </div>
  );
};
