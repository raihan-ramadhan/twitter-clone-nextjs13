import { languages, topics, topicsAndSub } from "../data/user";

import type { Theme, Accent } from "./theme";
import type { Timestamp, FirestoreDataConverter } from "firebase/firestore";

export type Birthdate = {
  month: number;
  date: number;
  year: number;
};

export type Languages = typeof languages[number];

export type User = {
  id: string;
  bio: string | null;
  name: string;
  theme: Theme | null;
  accent: Accent | null;
  website: string | null;
  location: string | null;
  username: string;
  photoURL: string;
  verified: boolean;
  following: string[];
  followers: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
  totalTweets: number;
  totalPhotos: number;
  pinnedTweet: string | null;
  coverPhotoURL: string | null;
  birthdate: Birthdate;
  customizeExperience: boolean | null;
  notifications: boolean | null;
  languages: Languages[];
  topics: typeof topics[number][];
  subTopics: typeof topicsAndSub[number][];
  lists: string[];
};

export type EditableData = Extract<
  keyof User,
  "bio" | "name" | "website" | "photoURL" | "location" | "coverPhotoURL"
>;

export type EditableUserData = Pick<User, EditableData>;

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user) {
    return { ...user };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return { ...data } as User;
  },
};
