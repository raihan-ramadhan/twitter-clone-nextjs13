import cn from "clsx";
import { Button } from "../button";
import { CustomIcon } from "../custom-icons";

type ButtonFormProps = {
  text: string | JSX.Element;
  callback?: (() => Promise<void>) | (() => void);
  className?: string;
  loading?: boolean | undefined;
  disabled?: boolean;
};

type ProviderProps = ButtonFormProps & {
  provider: "google" | "apple";
};

export const ButtonProvider = ({
  provider,
  text,
  callback,
  className,
}: ProviderProps): JSX.Element => {
  const sameCN =
    "w-full font-semibold py-1 flex items-center justify-center gap-3 border border-light-line-reply dark:border-light-secondary";
  return (
    <>
      {provider == "google" ? (
        <Button
          onClick={callback}
          className={cn(
            sameCN,
            "hover:bg-accent-blue/5 outline-none",
            className
          )}
        >
          <CustomIcon iconName="GoogleIcon" className="h-5 w-5 shrink-0" />
          <span className="truncate w-40 text-start">
            <>{text}</>
          </span>
        </Button>
      ) : (
        <Button
          onClick={callback}
          className={cn(
            sameCN,
            "hover:bg-light-line-reply/20 dark:hover:bg-light-secondary/20",
            className
          )}
        >
          <CustomIcon iconName="AppleIcon" className="h-5 w-5 shrink-0" />
          <span className="truncate w-40 text-start">
            <>{text}</>
          </span>
        </Button>
      )}
    </>
  );
};

export const ButtonHighlight = ({
  text,
  callback,
  className,
  loading,
  disabled,
}: ButtonFormProps): JSX.Element => {
  return (
    <>
      <Button
        disabled={disabled}
        loading={loading}
        onClick={() => {
          if (typeof callback === "function") callback();
        }}
        className={cn(
          "truncate w-full font-semibold border border-light-line-reply dark:border-light-secondary text-center bg-black dark:bg-white  transition-opacity duration-200 text-white dark:text-black",
          !disabled && !loading && "hover:opacity-80 active:opacity-100",
          className ?? "py-1"
        )}
      >
        <>{text}</>
      </Button>
    </>
  );
};

export const ButtonSecondary = ({
  text,
  callback,
  className,
  loading,
}: ButtonFormProps): JSX.Element => {
  return (
    <>
      <Button
        loading={loading}
        onClick={() => {
          if (typeof callback === "function") callback();
        }}
        className={cn(
          "truncate w-full hover:bg-main-background-3/50 active:bg-transparent font-semibold border border-light-line-reply dark:border-light-secondary text-center",
          className ?? "py-1"
        )}
      >
        <>{text}</>
      </Button>
    </>
  );
};
