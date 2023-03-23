import cn from "clsx";
import Link from "next/link";
import { HeroIcon } from "../ui/hero-icon";

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
      href={`/user/${username}`}
      className={cn(
        "flex items-center gap-1 truncate font-bold",
        username ? "custom-underline" : "pointer-events-none",
        className
      )}
    >
      <CustomTag className="truncate">{name}</CustomTag>
      {verified && (
        <i>
          <HeroIcon
            className={cn("fill-accent-blue", iconClassName ?? "h-5 w-5")}
            iconName="CheckBadgeIcon"
            solid
          />
        </i>
      )}
    </Link>
  );
}
