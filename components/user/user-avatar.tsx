import Link from "next/link";
import cn from "clsx";
import { NextImage } from "../ui/next-image";

type UserAvatarProps = {
  src: string;
  alt: string;
  size?: number;
  username?: string;
  className?: string;
  tabIndex?: "0" | "-1";
};

export function UserAvatar({
  src,
  alt,
  size,
  username,
  className,
  tabIndex = "0",
}: UserAvatarProps): JSX.Element {
  const pictureSize = size ?? 48;

  return (
    <Link
      href={username ? `/user/${username}` : "#"}
      className={cn(
        "blur-picture flex self-start",
        !username && "pointer-events-none",
        className
      )}
      prefetch={!username ? false : undefined}
      tabIndex={!username || tabIndex == "-1" ? -1 : 0}
    >
      <NextImage
        useSkeleton
        imgClassName="rounded-full"
        width={pictureSize}
        height={pictureSize}
        src={src}
        alt={alt}
        key={src}
      />
    </Link>
  );
}
