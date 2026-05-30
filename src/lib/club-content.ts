export type ClassSession = {
  group: string;
  ages?: string;
  time: string;
};

export type ClassDay = {
  day: string;
  focus: string;
  coaches: string[];
  sessions: ClassSession[];
};

export type GalleryCategory = {
  title: string;
  description: string;
};

export const clubContact = {
  email: "Larkhilldojo@gmail.com",
  address: "Unit 4, Santry Hall Industrial Estate, Santry, Dublin 9, D09 V409",
  locality: "Santry, Dublin",
};

export const karateDiscipline = "Kenpo";

export const classTimetable: ClassDay[] = [
  {
    day: "Tuesday",
    focus: "Kata",
    coaches: ["Joe", "Dylan"],
    sessions: [
      {
        group: "4-6 years",
        time: "5:30 PM to 6:00 PM",
      },
      {
        group: "7-9 years",
        time: "6:15 PM to 7:00 PM",
      },
      {
        group: "10-12 years",
        time: "7:15 PM to 8:00 PM",
      },
      {
        group: "13+ years",
        time: "8:15 PM to 9:00 PM",
      },
    ],
  },
  {
    day: "Thursday",
    focus: "Kumite",
    coaches: ["Shauna"],
    sessions: [
      {
        group: "7-9 years",
        time: "6:00 PM to 7:00 PM",
      },
      {
        group: "10-12 years",
        time: "7:00 PM to 8:00 PM",
      },
      {
        group: "13+ years",
        time: "8:00 PM to 9:00 PM",
      },
    ],
  },
];

export const galleryCategories: GalleryCategory[] = [
  {
    title: "Training",
    description: "Everyday class work, drills, and squad sessions.",
  },
  {
    title: "Gradings",
    description: "Milestone days and belt progression.",
  },
  {
    title: "Competitions",
    description: "Team events, performances, and results.",
  },
  {
    title: "Club events",
    description: "Community days and moments away from regular classes.",
  },
];

export const safeguardingNotes = [
  "New uploads should start as draft until a trusted staff member checks them.",
  "Published media should be easy to unpublish or delete if consent changes.",
  "Captions should avoid unnecessary personal details about children.",
];
