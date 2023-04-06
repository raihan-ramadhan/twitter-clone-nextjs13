import cn from "clsx";
import { HeroIcon } from "../ui/hero-icon";

import type { Month } from "../../lib/types/requireData";
import type { PropsSelect } from "../../lib/types/requireData";

export const Select: React.FC<PropsSelect> = ({
  placeholder,
  options,
  name,
  value,
  classSelect,
  handler,
}) => {
  const restOptions: JSX.Element[] = options.map((option: Month | number) => {
    if (typeof option === "number")
      return (
        <option
          key={`${option}`}
          className="bg-main-background-1"
          value={option}
        >
          {option}
        </option>
      );
    return (
      <option
        key={`${option.name}`}
        className="bg-main-background-1"
        value={option.value}
      >
        {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
      </option>
    );
  });

  return (
    <div
      className={cn(
        "relative w-full text-light-secondary dark:text-light-secondary",
        classSelect
      )}
      data-te-input-wrapper-init
    >
      <select
        id="formControlSelectMonth"
        className="cursor-pointer bg-main-background-1 peer outline-none p-2 pt-6 w-full text-base rounded-md border dark:text-light-line-reply text-light-secondary border-light-line-reply dark:border-light-secondary bg-transparent transition-all duration-200 ease-linear motion-reduce:transition-none focus:!border-accent-blue appearance-none overflow-y-auto"
        data-te-select-visible-options={"6"}
        data-te-select-init
        onChange={handler}
        value={value}
        name={name}
        required
      >
        <option disabled className="bg-main-background-1" value={0} />
        {restOptions}
      </select>
      <HeroIcon
        iconName="ChevronDownIcon"
        className="h-5 w-5 pointer-events-none absolute text-light-secondary dark:text-light-line-reply peer-focus:text-accent-blue right-2 top-1/2 -translate-y-1/2"
      />
      <label
        data-te-select-label-ref
        htmlFor="formControlSelectMonth"
        className="pointer-events-none text-light-secondary dark:text-light-line-reply absolute text-lg top-1/2 -translate-y-1/2 left-2 mb-0 max-w-[90%] origin-[0_0] truncate transition-all duration-200 ease-out motion-reduce:transition-none
            peer-valid:top-1 peer-valid:translate-y-[unset] peer-valid:scale-[0.8] 
            peer-focus:top-1 peer-focus:translate-y-[unset] peer-focus:scale-[0.8] peer-focus:text-accent-blue dark:peer-focus:text-accent-blue
            peer-data-[te-input-state-active]:top-1 peer-data-[te-input-state-active]:translate-y-[unset] peer-data-[te-input-state-active]:scale-[0.8] dark:peer-data-[te-input-state-active]:text-accent-blue"
      >
        {placeholder}
      </label>
    </div>
  );
};
