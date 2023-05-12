import { queryEqual } from "firebase/firestore";
import { useState, useEffect } from "react";

import type { Query } from "firebase/firestore";

export function useCacheQuery<T>(query: Query<T>): Query<T> {
  const [cachedQuery, setCachedQuery] = useState(query);

  useEffect(() => {
    if (!queryEqual(query, cachedQuery)) setCachedQuery(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return cachedQuery;
}
