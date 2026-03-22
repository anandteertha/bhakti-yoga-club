import { mediaUrl } from "./constants";

export type CoursePdf = {
  label: string;
  href: string;
};

export const coursePresentation: {
  intro: string;
  image: string;
  imageAlt: string;
  pdfs: readonly CoursePdf[];
} = {
  intro: "Slide decks from the three-session Bhagavad-gītā overview — download and study at your pace.",
  image: mediaUrl("2016/02/bgcourse.jpg"),
  imageAlt: "Bhagavad-gītā course graphic",
  pdfs: [
    { label: "Session 1 — 3sessionBGcourse_1", href: mediaUrl("2016/02/3sessionbgcourse_1.pdf") },
    { label: "Session 2 — 3sessionBGcourse_2", href: mediaUrl("2016/02/3sessionbgcourse_2.pdf") },
    { label: "Session 3 — 3sessionBGcourse_3", href: mediaUrl("2016/02/3sessionbgcourse_3.pdf") },
  ],
};
