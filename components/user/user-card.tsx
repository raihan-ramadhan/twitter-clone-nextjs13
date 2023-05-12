import { UserAvatar } from "@/components/user/user-avatar";
import { UserName } from "./user-name";
import { UserUsername } from "./user-username";
import { FollowButton } from "../ui/follow-button";
import { useRouter } from "next/navigation";

import type { User } from "@/lib/types/user";
import { preventBubbling } from "@/lib/utils";

type UserCardProps = User & {
  modal?: boolean;
  follow?: boolean;
};

export function UserCard(user: UserCardProps): JSX.Element {
  const router = useRouter();
  const { id, name, username, verified, photoURL } = user;

  return (
    <div
      className="accent-tab hover-animation flex items-center w-full gap-3 px-4 py-3 hover:bg-light-primary/5 dark:hover:bg-dark-primary/5 overflow-hidden cursor-pointer"
      onClick={() => router.push(`/${username}`)}
    >
      <UserAvatar src={photoURL} alt={name} username={username} />
      <div className="flex gap-1 items-center h-full w-full overflow-hidden">
        <div className="flex flex-col justify-center truncate flex-1 shrink">
          <UserName
            className="-mb-1"
            name={name}
            username={username}
            verified={verified}
          />
          <UserUsername username={username} />
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <FollowButton userTargetId={id} userTargetUsername={username} />
        </div>
      </div>
    </div>
  );
}
