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
  email: "larkhilldojo@gmail.com",
  phone: "0879325172",
  address: "Unit 4, Santry Hall Industrial Estate, Santry, Dublin 9, D09 V409",
  locality: "Santry, Dublin",
  parking: "Parking is available outside the club entrance.",
  mapsUrl: "https://www.google.com/maps/place/Larkhill+Karate+Club/@53.3946335,-6.2506171,17z/data=!3m1!4b1!4m6!3m5!1s0x48670e27db2f3f19:0x37ef144d43c5a36e!8m2!3d53.3946335!4d-6.2480422!16s%2Fg%2F11bbrjb_t5?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D",
  facebookUrl: "https://www.facebook.com/LarkhillKarateClub",
};

export const coaches: Coach[] = [
  {
    name: "Dylan",
    role: "Coach",
    classFocus: "Tuesday Kata",
    image: {
      src: "/media/coaches/dylan.png",
      alt: "Coach Dylan",
      width: 512,
      height: 512,
    },
  },
  {
    name: "Joe",
    role: "Coach",
    classFocus: "Tuesday Kata",
    image: {
      src: "/media/coaches/joe.png",
      alt: "Coach Joe",
      width: 512,
      height: 512,
    },
  },
  {
    name: "Shauna",
    role: "Coach",
    classFocus: "Thursday Kumite",
    image: {
      src: "/media/coaches/shauna.png",
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
      src: "/media/classes/kata.jpg",
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
      src: "/media/classes/kumite.jpg",
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
