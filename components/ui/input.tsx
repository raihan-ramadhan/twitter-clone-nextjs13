import cn from "clsx";
import { forwardRef } from "react";
import type { ComponentPropsWithRef } from "react";

//  Cannot give type prop to this component
type InputInputCheckboxProps = Omit<ComponentPropsWithRef<"input">, "type"> & {
  wrapperClassName?: string;
  beforeClassName?: string;
  checkboxClassName?: string;
};

export const InputCheckbox = forwardRef<
  HTMLInputElement,
  InputInputCheckboxProps
>(
  (
    {
      wrapperClassName,
      beforeClassName,
      checkboxClassName,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          "h-[1.125rem] w-[1.125rem] z-0 relative",
          wrapperClassName ?? "group"
        )}
      >
        <input
          // prettier-ignore
          className={cn(`peer absolute inset-0 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-full h-full appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-light-secondary outline-none
        hover:cursor-pointer
        checked:border-accent-blue checked:bg-accent-blue 
        checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] 
        focus:after:absolute focus:after:z-0 focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] 
        checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent
      dark:border-light-line-reply dark:checked:border-accent-blue 
        `, className)}
          {...rest}
          ref={ref}
          type="checkbox"
        />
        <div
          className={cn(
            "absolute inset-0 w-full h-full rounded-full bg-transparent transition-colors duration-200 z-[-1] -translate-x-1/2 left-1/2",
            beforeClassName ??
              "scale-[2] group-hover:bg-dark-line-reply/10 peer-focus:bg-dark-line-reply/10 dark:group-hover:bg-light-line-reply/10 dark:peer-focus:bg-light-line-reply/10"
          )}
        />
      </div>
    );
  }
);
InputCheckbox.displayName = "MyInputCheckboxComponent";

//  Cannot give type prop to this component
type InputTextProps = Omit<ComponentPropsWithRef<"input">, "type"> & {
  placeholder?: string;
  classNamePlaceholder?: string;
  id: string;
};

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  (
    { placeholder, className, classNamePlaceholder, name, id, ...rest },
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
              className={cn(
                "peer outline-none p-2 pt-6 w-full text-lg rounded-md border dark:text-light-line-reply text-light-secondary border-light-line-reply dark:border-light-secondary bg-transparent transition-all duration-200 ease-linear motion-reduce:transition-none focus:!border-accent-blue",
                className
              )}
              id={id}
              required
              {...rest}
              ref={ref}
              type="text"
            />
            {placeholder && (
              <label
                htmlFor={id}
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
