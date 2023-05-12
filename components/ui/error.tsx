import { CustomIcon } from "./custom-icons";

type ErrorProps = {
  message?: string;
};

export function Error({ message }: ErrorProps): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-5 px-3 text-light-secondary dark:text-dark-secondary">
      <i>
        <CustomIcon iconName="CloudSlash" className="h-10 w-10" />
      </i>
      <p>{message ?? "Something went wrong. Try Loading."}</p>
    </div>
  );
}
