import { RightProps } from "../layouts/common-layout";
import { SearchBar } from "../ui/search-bar";
import { RightFollowRec } from "./right-follow-rec";

export const RightWithUser = ({
  followRec,
  mightLike,
  photos,
  searchbar,
  trends,
}: RightProps) => {
  return (
    <>
      {searchbar && <SearchBar placeholder="Search Twitter" />}
      {photos && <section>PHOTOS</section>}
      {mightLike && <section>Might Like</section>}
      {trends && <section>TRENDS</section>}
      {followRec && <RightFollowRec />}
    </>
  );
};
