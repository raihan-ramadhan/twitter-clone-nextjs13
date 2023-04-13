import cn from "clsx";
import { forwardRef } from "react";
import type { ComponentPropsWithRef } from "react";

type InputCheckboxProps = Omit<ComponentPropsWithRef<"input">, "type"> & {
  wrapperClassName?: string;
  beforeClassName?: string;
  checkboxClassName?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, InputCheckboxProps>(
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
