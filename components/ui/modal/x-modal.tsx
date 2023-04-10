import { Button } from "../button";
import { HeroIcon } from "../hero-icon";

import type { ComponentPropsWithRef } from "react";

type ButtonProps = ComponentPropsWithRef<"button"> & {
  closeModal: () => void;
};

export const XModal = ({
  closeModal,
  children,
  ...rest
}: ButtonProps): JSX.Element => {
  return (
    <>
      <Button
        tabIndex={0}
        onClick={closeModal}
        className="absolute top-2 left-2 p-2 hover:bg-main-background-3 focus-visible:bg-main-background-3"
      >
        <HeroIcon iconName="XMarkIcon" className="h-5 w-5" />
      </Button>
    </>
  );
};