import Link from "next/link";
import {
  doc,
  query,
  where,
  limit,
  orderBy,
  documentId,
} from "firebase/firestore";

import { Error } from "../ui/error";
import { useAuth } from "@/lib/context/auth-context";
import { Loading } from "../ui/loading";
import { UserCard } from "../user/user-card";
import { useDocument } from "@/lib/hooks/useDocument";
import { useCollection } from "@/lib/hooks/useCollection";
import { usersCollection } from "@/lib/firebase/collections";

export const RightFollowRec = () => {
  const { randomSeed } = useAuth();

  const { data: adminData, loading: adminLoading } = useDocument(
    doc(usersCollection, "6nrRJqvJOhT88F4k7BkAR6HymhC2"),
    { allowNull: true }
  );

  const { data: followRecommendation, loading: followRecommendationLoading } =
    useCollection(
      query(
        usersCollection,
        where(documentId(), ">=", randomSeed),
        orderBy(documentId()),
        limit(2)
      ),
      { allowNull: true }
    );

  return (
    <aside
      role="complementary"
      aria-label="Who to follow"
      className="bg-main-background-3 rounded-2xl m-3"
    >
      {adminLoading || followRecommendationLoading ? (
        <Loading className="flex h-52 items-center justify-center p-4" />
      ) : followRecommendation ? (
        <>
          <h2
            role="heading"
            className="text-xl leading-none font-bold p-3 block"
          >
            Who to follow
          </h2>
          {adminData && <UserCard {...adminData} />}
          {followRecommendation.map((userData) => (
            <UserCard {...userData} key={userData.id} />
          ))}
          <Link
            href="/i/connect_people"
            className="custom-button accent-tab hover-card block w-full rounded-2xl rounded-t-none text-left text-main-accent"
          >
            Show more
          </Link>
        </>
      ) : (
        <Error />
      )}
    </aside>
  );
};
