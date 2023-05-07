export type KeysTables = Array<{
  title: string;
  rows: Array<{ subtitle: string; keys: string[] }>;
}>;

export const keysTables: KeysTables = [
  {
    title: "Navigation",
    rows: [
      {
        subtitle: "Shortcut help",
        keys: ["?"],
      },
      {
        subtitle: "Next Tweet",
        keys: ["j"],
      },
      {
        subtitle: "Previous Tweet",
        keys: ["k"],
      },
      {
        subtitle: "Page down",
        keys: ["Space"],
      },
      {
        subtitle: "Load new Tweets",
        keys: ["."],
      },
      {
        subtitle: "Home",
        keys: ["g", "h"],
      },
      {
        subtitle: "Explore",
        keys: ["g", "e"],
      },
      {
        subtitle: "Notifications",
        keys: ["g", "n"],
      },
      {
        subtitle: "Mentions",
        keys: ["g", "r"],
      },
      {
        subtitle: "Profile",
        keys: ["g", "p"],
      },
      {
        subtitle: "Drafts",
        keys: ["g", "f"],
      },
      {
        subtitle: "Scheduled Tweets",
        keys: ["g", "t"],
      },
      {
        subtitle: "Likes",
        keys: ["g", "l"],
      },
      {
        subtitle: "Lists",
        keys: ["g", "i"],
      },
      {
        subtitle: "Direct Messages",
        keys: ["g", "m"],
      },
      {
        subtitle: "Settings",
        keys: ["g", "s"],
      },
      {
        subtitle: "Bookmarks",
        keys: ["g", "b"],
      },
      {
        subtitle: "Go to user…",
        keys: ["g", "u"],
      },
      {
        subtitle: "Display settings",
        keys: ["g", "d"],
      },
    ],
  },
  {
    title: "Actions",
    rows: [
      {
        subtitle: "New Tweet",
        keys: ["n"],
      },
      {
        subtitle: "Send Tweet",
        keys: ["CTRL", "Enter"],
      },
      {
        subtitle: "New Direct Message",
        keys: ["m"],
      },
      {
        subtitle: "Search",
        keys: ["/"],
      },
      {
        subtitle: "Like",
        keys: ["l"],
      },
      {
        subtitle: "Reply",
        keys: ["r"],
      },
      {
        subtitle: "Retweet",
        keys: ["t"],
      },
      {
        subtitle: "Share Tweet",
        keys: ["s"],
      },
      {
        subtitle: "Bookmark",
        keys: ["b"],
      },
      {
        subtitle: "Mute account",
        keys: ["u"],
      },
      {
        subtitle: "Block account",
        keys: ["x"],
      },
      {
        subtitle: "Open Tweet details",
        keys: ["Enter"],
      },
      {
        subtitle: "Expand photo",
        keys: ["o"],
      },
      {
        subtitle: "Open/Close Messages dock",
        keys: ["i"],
      },
    ],
  },
  {
    title: "Media",
    rows: [
      {
        subtitle: "Pause/Play selected Video",
        keys: ["k"],
      },
      {
        subtitle: "Pause/Play selected Video",
        keys: ["space"],
      },
      {
        subtitle: "Mute selected Video",
        keys: ["m"],
      },
      {
        subtitle: "Go to Audio Dock",
        keys: ["a", "d"],
      },
      {
        subtitle: "Play/Pause Audio Dock",
        keys: ["a", "space"],
      },
      {
        subtitle: "Mute/Unmute Audio Dock",
        keys: ["a", "m"],
      },
    ],
  },
];
