"use client";
import { useState, useContext, createContext, useMemo, useEffect } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut as signOutFirebase,
} from "firebase/auth";
import {
  doc,
  setDoc,
  onSnapshot,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";
import {
  usersCollection,
  userStatsCollection,
  userBookmarksCollection,
} from "@/lib/firebase/collections";
import { auth, db } from "../firebase/app";

import { getRandomId, getRandomInt } from "@/lib/random";

import type { ReactNode } from "react";
import type { User } from "@/lib/types/user";
import type { Bookmark } from "@/lib/types/bookmark";
import type { Stats } from "@/lib/types/stats";
import type { User as AuthUser } from "firebase/auth";
import type { WithFieldValue } from "firebase/firestore";

type AuthContext = {
  user: User | null;
  error: Error | null;
  loading: boolean;
  isAdmin: boolean;
  randomSeed: string;
  userBookmarks: Bookmark[] | null;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
};

export const AuthContext = createContext<AuthContext | null>(null);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({
  children,
}: AuthContextProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [userBookmarks, setUserBookmarks] = useState<Bookmark[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const manageUser = async (authUser: AuthUser): Promise<void> => {
      const { uid, displayName, photoURL } = authUser;
      const userSnapshot = await getDoc(doc(usersCollection, uid));

      if (!userSnapshot.exists()) {
        let available = false;
        let randomUsername = "";

        while (!available) {
          const normalizeName = displayName?.replace(/\s/g, "").toLowerCase();
          const randomInt = getRandomInt(1, 10_000);
          randomUsername = `${normalizeName as string}${randomInt}`;

          const q = query(
            usersCollection,
            where("username", "==", randomUsername)
          );
          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) available = true;
        }

        const userData: WithFieldValue<User> = {
          id: uid,
          bio: null,
          name: displayName as string,
          theme: null,
          accent: null,
          website: null,
          location: null,
          photoURL: photoURL as string,
          username: randomUsername,
          verified: false,
          following: [],
          followers: [],
          createdAt: serverTimestamp(),
          updatedAt: null,
          totalTweets: 0,
          totalPhotos: 0,
          pinnedTweet: null,
          coverPhotoURL: null,
          birthdate: {
            month: 0,
            date: 0,
            year: 0,
          },
          customizeExperience: null,
        };

        const userStatsData: WithFieldValue<Stats> = {
          likes: [],
          tweets: [],
          updatedAt: null,
        };

        try {
          await Promise.all([
            setDoc(doc(usersCollection, uid), userData),
            setDoc(doc(userStatsCollection(uid), "stats"), userStatsData),
          ]);

          const newUser = (await getDoc(doc(usersCollection, uid))).data();
          setUser(newUser as User);
        } catch (error) {
          setError(error as Error);
        }
      } else {
        const userData = userSnapshot.data();

        const isBirtdateCorrect = (userData: User): boolean => {
          const { birthdate } = userData;
          const { month, date, year } = birthdate;
          return !(month === 0 || date === 0 || year === 0);
        };

        const requireBirtdate = isBirtdateCorrect(userData);
        if (requireBirtdate) setUser(userData);
      }

      setLoading(false);
    };

    const handleUserAuth = (authUser: AuthUser | null): void => {
      setLoading(true);
      console.log(authUser);

      if (authUser) void manageUser(authUser);
      else {
        setUser(null);
        setLoading(false);
      }
    };

    onAuthStateChanged(auth, handleUserAuth);
  }, []);

  useEffect(() => {
    if (!user) return;

    const { id } = user;

    const unsubscribeUser = onSnapshot(doc(usersCollection, id), (doc) => {
      setUser(doc.data() as User);
    });

    const unsubscribeBookmarks = onSnapshot(
      userBookmarksCollection(id),
      (snapshot) => {
        const bookmarks = snapshot.docs.map((doc) => doc.data());
        setUserBookmarks(bookmarks);
      }
    );

    return () => {
      unsubscribeUser();
      unsubscribeBookmarks();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const signInWithGoogle = async (): Promise<void> => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account consent",
      });
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError(error as Error);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await signOutFirebase(auth);
    } catch (error) {
      setError(error as Error);
    }
  };

  const isAdmin = user ? user.username === "ccrsxx" : false;
  const randomSeed = useMemo(getRandomId, [user?.id]);

  const value: AuthContext = {
    user,
    error,
    loading,
    isAdmin,
    randomSeed,
    userBookmarks,
    signOut,
    signInWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContext {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("useAuth must be used within an AuthContextProvider");

  return context;
}
