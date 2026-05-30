export type ClassSession = {
  group: string;
  ages?: string;
  time: string;
};

export type ClassDay = {
  day: string;
  focus: string;
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

export const classTimetable: ClassDay[] = [
  {
    day: "Tuesday",
    focus: "Kata",
    sessions: [
      {
        group: "Dragons",
        ages: "6 to 8 years",
        time: "6:00 PM to 6:45 PM",
      },
      {
        group: "Panthers",
        ages: "9 years to teens",
        time: "7:00 PM to 7:45 PM",
      },
      {
        group: "Intermediate",
        ages: "teens to adults",
        time: "8:00 PM to 9:00 PM",
      },
    ],
  },
  {
    day: "Thursday",
    focus: "Kumite",
    sessions: [
      {
        group: "Lions",
        ages: "4 and 5 years",
        time: "5:15 PM to 6:00 PM",
      },
      {
        group: "Dragons",
        time: "6:00 PM to 6:45 PM",
      },
      {
        group: "Panthers",
        time: "7:00 PM to 7:45 PM",
      },
      {
        group: "Intermediate and advanced",
        time: "7:45 PM to 9:00 PM",
      },
    ],
  },
  {
    day: "Saturday",
    focus: "Kata and Kumite",
    sessions: [
      {
        group: "Team Kata",
        time: "9:00 AM to 10:00 AM",
      },
      {
        group: "Open Kata",
        ages: "age 10 and above",
        time: "10:00 AM to 11:15 AM",
      },
      {
        group: "Kumite",
        ages: "under 12 years",
        time: "11:30 AM to 12:45 PM",
      },
      {
        group: "Kumite",
        ages: "over 12 years",
        time: "1:00 PM",
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
