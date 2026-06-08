import { fetchNotes, isValidTag } from "@/lib/api";
import NotesClient from "./Notes.client";
import css from "./NotesPage.module.css";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string[] };
};

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
