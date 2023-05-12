import cn from "clsx";
import Link from "next/link";
import { CustomIcon } from "../ui/custom-icons";

type UserNameProps = {
  tag?: keyof JSX.IntrinsicElements;
  name: string;
  verified: boolean;
  username?: string;
  className?: string;
  iconClassName?: string;
};

export function UserName({
  tag,
  name,
  verified,
  username,
  className,
  iconClassName,
}: UserNameProps): JSX.Element {
  const CustomTag = tag ? tag : "p";

  return (
    <Link
      href={username ? `/${username}` : "#"}
      className={cn(
        "flex items-center gap-1 truncate font-bold",
        username ? "custom-underline" : "pointer-events-none",
        className
      )}
      tabIndex={username ? 0 : -1}
    >
      <CustomTag className="truncate">{name}</CustomTag>
      {verified && (
        <i>
          <CustomIcon
            className={cn("!fill-accent-blue", iconClassName ?? "h-5 w-5")}
            iconName="VerificationBadge"
            solid
          />
        </i>
      )}
    </Link>
  );
}
