"use client";
import { useState, useContext, createContext, useMemo, useEffect } from "react";
import { getRandomId, getRandomInt } from "@/lib/random";
import { isBirtdateCorrect } from "../utils";
import { useRequireData } from "./require-data-context";
import { auth } from "../firebase/app";
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
import {
  checkUsernameAvailability,
  updateUserNewUser,
} from "../firebase/utils";

import type { WithFieldValue } from "firebase/firestore";
import type { User as AuthUser } from "firebase/auth";
import type { Bookmark } from "@/lib/types/bookmark";
import type { Stats } from "@/lib/types/stats";
import type { User } from "@/lib/types/user";
import type { ReactNode } from "react";

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

        while (!available) {
          const normalizeName = displayName?.replace(/\s/g, "").toLowerCase();
          const randomInt = getRandomInt(1, 10_000);
          randomUsername = `${normalizeName as string}${randomInt}`;

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
          birthdate: { month: 0, date: 0, year: 0 },
          customizeExperience: null,
          newUser: true,
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

          const requireBirtdate = isBirtdateCorrect(newUser as User);
          if (requireBirtdate) {
            setUser(newUser as User);
            setRequireData(false);
            setIsLogging(false);
          } else {
            setRequireData(true);
          }
          setLoadingRequireData(false);
        } catch (error) {
          setError(error as Error);
        }
      } else {
        await updateUserNewUser(uid);

        const userData = userSnapshot.data();

        const requireBirtdate = isBirtdateCorrect(userData);
        if (requireBirtdate) {
          setUser(userData);
          setRequireData(true);
          setIsLogging(false);
        } else {
          setRequireData(true);
        }
        setLoadingRequireData(false);
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
