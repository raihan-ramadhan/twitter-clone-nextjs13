import { forwardRef } from "react";

import type { ComponentPropsWithRef } from "react";
type HrProps = ComponentPropsWithRef<"hr">;

export const HrLine = forwardRef<HTMLHRElement, HrProps>((rest, ref) => {
  return (
    <hr
      ref={ref}
      className="border-t-light-border dark:border-t-dark-border"
      {...rest}
    />
  );
});

HrLine.displayName = "MyHrLineComponent";
