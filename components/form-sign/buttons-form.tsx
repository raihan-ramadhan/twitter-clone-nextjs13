import { Button } from "../ui/button";
import { CustomIcon } from "../ui/custom-icons";

type ProviderProps = {
  provider: "google" | "apple";
  text: string;
  callback?: (() => Promise<void>) | (() => void);
};

export const ButtonProvider = ({
  provider,
  text,
  callback,
}: ProviderProps): JSX.Element => {
  return (
    <>
      {provider == "google" ? (
        <Button
          onClick={callback}
          className="w-full font-semibold py-1 flex items-center justify-center gap-3 border border-light-line-reply dark:border-light-secondary hover:bg-accent-blue/5 outline-none"
        >
          <CustomIcon iconName="GoogleIcon" className="h-5 w-5 shrink-0" />
          <span className="truncate w-40 text-start">{text}</span>
        </Button>
      ) : (
        <Button
          onClick={callback}
          className="w-full font-semibold py-1 flex items-center justify-center gap-3 border border-light-line-reply dark:border-light-secondary hover:bg-light-line-reply/20 dark:hover:bg-light-secondary/20"
        >
          <CustomIcon iconName="AppleIcon" className="h-5 w-5 shrink-0" />
          <span className="truncate w-40 text-start">{text}</span>
        </Button>
      )}
    </>
  );
};

export const ButtonHighlight = ({ text }: { text: string }): JSX.Element => {
  return (
    <>
      <Button className="truncate w-full font-semibold py-1 border border-light-line-reply dark:border-light-secondary text-center bg-black dark:bg-white hover:opacity-80 active:opacity-100 transition-opacity duration-200 text-white dark:text-black">
        {text}
      </Button>
    </>
  );
};

export const ButtonSecondary = ({ text }: { text: string }): JSX.Element => {
  return (
    <>
      <Button className="truncate w-full font-semibold py-1 border border-light-line-reply dark:border-light-secondary text-center">
        {text}
      </Button>
    </>
  );
};
