"use client";
import { auth } from "../firebase/app";
import { useRequireData } from "./require-data-context";
import { generateStringAndNumber, isBirtdateCorrect } from "../utils";
import { getRandomId, getRandomInt } from "@/lib/random";
import { mainRequireData, secondaryRequireData } from "../data/requireData";
import { useState, useContext, createContext, useMemo, useEffect } from "react";

import {
  signOut as signOutFirebase,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import {
  serverTimestamp,
  onSnapshot,
  getDoc,
  setDoc,
  doc,
} from "firebase/firestore";

import {
  userBookmarksCollection,
  userStatsCollection,
  usersCollection,
} from "@/lib/firebase/collections";

import { checkUsernameAvailability } from "../firebase/utils";

import type { Stats } from "@/lib/types/stats";
import type { Bookmark } from "@/lib/types/bookmark";
import type { ReactNode } from "react";
import type { WithFieldValue } from "firebase/firestore";
import type { Birthdate, User } from "@/lib/types/user";
import type { User as AuthUser } from "firebase/auth";

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
  const [loading, setLoading] = useState<boolean>(true);
  const {
    setLoading: setLoadingRequireData,
    setRequireData,
    setIsLogging,
    isLogging,
  } = useRequireData();

  useEffect(() => {
    const manageUser = async (authUser: AuthUser): Promise<void> => {
      const { uid, displayName, photoURL } = authUser;
      const userSnapshot = await getDoc(doc(usersCollection, uid));

      if (!userSnapshot.exists()) {
        let available = false;
        let randomUsername = "";
        const maxLength = 15;

        while (!available) {
          const normalizeName = displayName?.replace(/\s/g, "").toLowerCase();
          const randomInt = getRandomInt(1, 99999);

          randomUsername = generateStringAndNumber(
            normalizeName ?? "",
            randomInt,
            maxLength
          );

          const usernameAvailability = await checkUsernameAvailability(
            randomUsername
          );

          if (usernameAvailability) available = true;
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
          birthdate: { month: 0, date: 0, year: 0 } as Birthdate,
          customizeExperience: null,
          notifications: null,
          languages: [],
          topics: [],
          lists: [],
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

          await getDoc(doc(usersCollection, uid));

          setRequireData([...mainRequireData, ...secondaryRequireData]);
          setLoadingRequireData(false);
        } catch (error) {
          setError(error as Error);
        }
      } else {
        try {
          const userData = userSnapshot.data();

          const { birthdate, customizeExperience } = userData;

          const requireBirtdate = isBirtdateCorrect(birthdate);

          if (!requireBirtdate && !customizeExperience) {
            setRequireData([...mainRequireData]);
          } else if (!requireBirtdate) {
            setRequireData(["birthdate"]);
          } else if (!customizeExperience) {
            setRequireData(["customizeExperience"]);
          } else {
            setUser(userData);
            setRequireData(null);
            setIsLogging(false);
          }

          setLoadingRequireData(false);
        } catch (error) {
          setError(error as Error);
        }
      }

      setLoading(false);
    };

    const handleUserAuth = (authUser: AuthUser | null): void => {
      setLoading(true);

      if (authUser) void manageUser(authUser);
      else {
        setUser(null);
        setLoading(false);
        setLoadingRequireData(false);
      }
    };

    onAuthStateChanged(auth, handleUserAuth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogging]);

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
      setIsLogging(true);
      setLoadingRequireData(true);
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

  const isAdmin = user ? user.username === "raihan_rn22" : false;
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
