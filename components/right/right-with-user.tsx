import { RightProps } from "../layouts/common-layout";
import { SearchBar } from "../ui/search-bar";
import { RightFollowRec } from "./right-follow-rec";
import { RightTrends } from "./right-trends";

export const RightWithUser = ({
  followRec,
  mightLike,
  photos,
  searchbar,
  trends,
}: RightProps) => {
  return (
    <>
      {searchbar && (
        <div className="p-3 sticky top-0 z-20 blur-background">
          <SearchBar placeholder="Search Twitter" />
        </div>
      )}
      {photos && <section>PHOTOS</section>}
      {mightLike && <section>Might Like</section>}
      {trends && <RightTrends />}
      {followRec && <RightFollowRec />}
    </>
  );
};
