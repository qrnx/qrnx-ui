"use client";

import { useQuery } from "@tanstack/react-query";
import { getPollById } from "@/api/polls";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function PollPage() {
  const { pollId } = useParams();
  const { data: session } = useSession();

  const {
    data: poll,
    isPending,
    error,
  } = useQuery({
    queryKey: ["poll", pollId],
    queryFn: () => getPollById(pollId as string),
    enabled: !!session?.jwt,
    select: (data) => data.data,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div>
      {/* <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start"> */}

      <h1>{poll.title} Page</h1>
      {/* </main>
    </div> */}
    </div>
  );
}
