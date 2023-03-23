import Link from "next/link";
import cn from "clsx";

type UserUsernameProps = {
  username: string;
  className?: string;
  disableLink?: boolean;
};

export function UserUsername({
  username,
  className,
  disableLink,
}: UserUsernameProps): JSX.Element {
  return (
    <Link
      href={`/user/${username}`}
      className={cn(
        "truncate text-light-secondary dark:text-dark-secondary text-start",
        className,
        disableLink && "pointer-events-none"
      )}
    >
      @{username}
    </Link>
  );
}
