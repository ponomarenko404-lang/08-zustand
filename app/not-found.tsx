import css from "./home.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page not found",
  description: "The page you are looking for does not exist",
  openGraph: {
    title: "404 - Page not found | NoteHub",
    description: "The page you are looking for does not exist",
    url: "https://08-zustand-5ura3vio2-ponomarenko404-langs-projects.vercel.app",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
