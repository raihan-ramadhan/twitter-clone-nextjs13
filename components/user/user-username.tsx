import Link from "next/link";
import cn from "clsx";

type UserUsernameProps = {
  username: string;
  className?: string;
  disableLink?: boolean;
  tabIndex?: "0" | "-1";
};

export function UserUsername({
  username,
  className,
  disableLink,
  tabIndex = "0",
}: UserUsernameProps): JSX.Element {
  return (
    <Link
      href={disableLink ? "#" : `/${username}`}
      className={cn(
        "truncate text-light-secondary dark:text-dark-secondary text-start",
        className,
        disableLink && "pointer-events-none"
      )}
      tabIndex={disableLink || tabIndex == "-1" ? -1 : 0}
    >
      @{username}
    </Link>
  );
}
