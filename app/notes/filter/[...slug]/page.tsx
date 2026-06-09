import { fetchNotes, isValidTag } from "@/lib/api";
import NotesClient from "./Notes.client";
import css from "./NotesPage.module.css";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: { slug: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === "all" ? "All" : slug[0];
  return {
    title: `Notes ${tag}`,
    description: `All notes with this tag ${tag}`,
    openGraph: {
      title: `Notes - ${tag}`,
      description: `All notes with this tag ${tag}`,
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
}

export default async function NotesPage({ params }: Props) {
  const queryClient = new QueryClient();

  const { slug } = await params;

  if (slug[0] !== "all" && !isValidTag(slug[0])) {
    notFound();
  }

  const tag = slug[0] === "all" ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag ?? null],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: undefined,
        tag,
      }),
  });

  return (
    <div className={css.app}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient tag={tag} initialPage={1} />
      </HydrationBoundary>
    </div>
  );
}
