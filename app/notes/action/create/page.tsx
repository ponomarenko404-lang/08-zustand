// import { Metadata } from "next";
// import css from "./CreateNote.module.css";
// import { isValidTag } from "@/lib/api";
// import NoteForm from "@/components/NoteForm/NoteForm";

// export const metadata: Metadata = {
//   title: "Create note — NoteHub",
//   description: "Create a new note",
//   openGraph: {
//     title: "Create note — NoteHub",
//     description: "Create a new note",
//     url: "https://08-zustand-5ura3vio2-ponomarenko404-langs-projects.vercel.app",
//     images: [
//       {
//         url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
//         width: 1200,
//         height: 630,
//         alt: "NoteHub",
//       },
//     ],
//   },
// };

// export default async function CreateNote() {
//   const tag = isValidTag;
//   return (
//     <main className={css.main}>
//       <div className={css.container}>
//         <h1 className={css.title}>Create note</h1>
//         <NoteForm tag={tag} />
//       </div>
//     </main>
//   );
// }

import { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";

export const metadata: Metadata = {
  title: "Create note — NoteHub",
  description: "Create a new note",
  openGraph: {
    title: "Create note — NoteHub",
    description: "Create a new note",
    url: "https://08-zustand-5ura3vio2-ponomarenko404-langs-projects.vercel.app/notes/action/create",
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

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
