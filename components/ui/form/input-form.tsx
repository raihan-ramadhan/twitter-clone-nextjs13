import { forwardRef } from "react";
import type { ComponentPropsWithRef } from "react";
import cn from "clsx";

type InputTextProps = ComponentPropsWithRef<"input"> & {
  placeholder?: string;
  classNameInput?: string;
  classNamePlaceholder?: string;
};

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  (
    { placeholder, classNameInput, classNamePlaceholder, name, ...rest },
    ref
  ) => {
    return (
      <>
        <div className="flex justify-center">
          <div
            className="relative w-full text-light-secondary dark:text-light-secondary"
            data-te-input-wrapper-init
          >
            <input
              type="text"
              className={cn(
                "peer outline-none p-2 pt-6 w-full text-lg rounded-md border dark:text-light-line-reply text-light-secondary border-light-line-reply dark:border-light-secondary bg-transparent transition-all duration-200 ease-linear motion-reduce:transition-none focus:!border-accent-blue",
                classNameInput
              )}
              id="formControlInputText"
              required
              ref={ref}
              {...rest}
            />
            {placeholder && (
              <label
                htmlFor="formControlInputText"
                className={cn(
                  "pointer-events-none text-light-secondary dark:text-light-line-reply absolute text-lg top-1/2 -translate-y-1/2 left-2 mb-0 max-w-[90%] origin-[0_0] truncate transition-all duration-200 ease-out motion-reduce:transition-none peer-valid:top-1 peer-valid:translate-y-[unset] peer-valid:scale-[0.8] peer-focus:top-1 peer-focus:translate-y-[unset] peer-focus:scale-[0.8] peer-focus:text-accent-blue dark:peer-focus:text-accent-blue peer-data-[te-input-state-active]:top-1 peer-data-[te-input-state-active]:translate-y-[unset] peer-data-[te-input-state-active]:scale-[0.8] dark:peer-data-[te-input-state-active]:text-accent-blue",
                  classNamePlaceholder
                )}
              >
                {placeholder}
              </label>
            )}
          </div>
        </div>
      </>
    );
  }
);

InputText.displayName = "MyInputTextComponent";
