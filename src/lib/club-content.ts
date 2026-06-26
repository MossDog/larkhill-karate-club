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
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export type GalleryMedia = {
  src: string;
  alt: string;
  type: "image" | "video";
  width: number;
  height: number;
};

export type GalleryPost = {
  id: string;
  caption: string;
  media: GalleryMedia[];
};

export type Coach = {
  name: string;
  role: string;
  classFocus: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export const clubContact = {
  email: "Larkhilldojo@gmail.com",
  address: "Unit 4, Santry Hall Industrial Estate, Santry, Dublin 9, D09 V409",
  locality: "Santry, Dublin",
};

export const karateDiscipline = "Kenpo";

export const coaches: Coach[] = [
  {
    name: "Dylan",
    role: "Coach",
    classFocus: "Tuesday Kata",
    image: {
      src: "/placeholders/coaches/dylan.png",
      alt: "Coach Joe",
      width: 512,
      height: 512,
    },
  },
  {
    name: "Joe",
    role: "Coach",
    classFocus: "Tuesday Kata",
    image: {
      src: "/placeholders/coaches/joe.png",
      alt: "Coach Dylan",
      width: 512,
      height: 512,
    },
  },
  {
    name: "Shauna",
    role: "Coach",
    classFocus: "Thursday Kumite",
    image: {
      src: "/placeholders/coaches/shauna.png",
      alt: "Coach Shauna",
      width: 512,
      height: 512,
    },
  },
];

export const classTimetable: ClassDay[] = [
  {
    day: "Tuesday",
    focus: "Kata",
    coaches: ["Joe", "Dylan"],
    image: {
      src: "/placeholders/kata/b.jpg",
      alt: "Larkhill Karate Club kata class",
      width: 1024,
      height: 657,
    },
    sessions: [
      {
        group: "4-6 years",
        time: "5:30 PM to 6:00 PM",
      },
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
  {
    day: "Thursday",
    focus: "Kumite",
    coaches: ["Shauna"],
    image: {
      src: "/placeholders/kumite/a.jpg",
      alt: "Larkhill Karate Club kumite class",
      width: 1024,
      height: 650,
    },
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

export const galleryPosts: GalleryPost[] = [
  {
    id: "club-training",
    caption: "Club training",
    media: [
      {
        src: "/placeholders/gallery/582412955_1302711958322563_127700532966223909_n.jpg",
        alt: "Larkhill Karate Club training moment",
        type: "image",
        width: 1500,
        height: 2000,
      },
    ],
  },
  {
    id: "team-photo",
    caption: "Team photo",
    media: [
      {
        src: "/placeholders/gallery/598079138_1322722666321492_6363596889771893091_n.jpg",
        alt: "Larkhill Karate Club group photo",
        type: "image",
        width: 1600,
        height: 1200,
      },
    ],
  },
  {
    id: "grading-day",
    caption: "Grading day",
    media: [
      {
        src: "/placeholders/gallery/618255703_1354719213121837_5921434272179296080_n.jpg",
        alt: "Larkhill Karate Club grading moment",
        type: "image",
        width: 1080,
        height: 2400,
      },
    ],
  },
  {
    id: "on-the-mat",
    caption: "On the mat",
    media: [
      {
        src: "/placeholders/gallery/618798120_1354718873121871_2205595850675182797_n.jpg",
        alt: "Larkhill Karate Club class moment",
        type: "image",
        width: 1080,
        height: 2400,
      },
    ],
  },
  {
    id: "training-video",
    caption: "Training video",
    media: [
      {
        src: "/placeholders/gallery/b37cffbc-930a-4534-88d7-203550c4acd5.mp4",
        alt: "Larkhill Karate Club training video",
        type: "video",
        width: 1080,
        height: 1920,
      },
    ],
  },
  {
    id: "training-together",
    caption: "Training together",
    media: [
      {
        src: "/placeholders/gallery/slider1-slide-4.jpg",
        alt: "Larkhill Karate Club students training",
        type: "image",
        width: 1643,
        height: 850,
      },
    ],
  },
  {
    id: "squad-training-upload",
    caption: "Squad training upload",
    media: [
      {
        src: "/placeholders/gallery/multi-upload-example/25234fd1-5c22-4d86-b1ae-355fb2e37b46.jfif",
        alt: "Larkhill Karate Club uploaded gallery image",
        type: "image",
        width: 922,
        height: 2048,
      },
      {
        src: "/placeholders/gallery/multi-upload-example/ca1daa45-a397-45e1-9660-8301d489729c.jfif",
        alt: "Larkhill Karate Club uploaded gallery image",
        type: "image",
        width: 739,
        height: 1600,
      },
      {
        src: "/placeholders/gallery/multi-upload-example/e8da7336-0a72-41e9-87ca-64aae5a44371.jfif",
        alt: "Larkhill Karate Club uploaded gallery image",
        type: "image",
        width: 1600,
        height: 1200,
      },
      {
        src: "/placeholders/gallery/multi-upload-example/618798120_1354718873121871_2205595850675182797_n.jpg",
        alt: "Larkhill Karate Club uploaded gallery image",
        type: "image",
        width: 1080,
        height: 2400,
      },
      {
        src: "/placeholders/gallery/multi-upload-example/c9e74c72-d606-4137-aae3-6329eb23d84c.mp4",
        alt: "Larkhill Karate Club uploaded gallery video",
        type: "video",
        width: 1080,
        height: 1920,
      },
    ],
  },
];
