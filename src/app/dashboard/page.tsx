"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getPolls } from "@/api/polls";
import { PollCard, PollCardSkeleton } from "@/components/ui/poll-card";

export default function Dashboard() {
  const { data: session } = useSession();

  const {
    data: polls,
    isPending,
    error,
  } = useQuery({
    queryKey: ["polls"],
    queryFn: getPolls,
    enabled: !!session?.jwt,
    select: (data) => data.data,
  });

  const SKELETONS_AMOUNT = 3;

  const renderSkeletons = () => {
    return Array.from({ length: SKELETONS_AMOUNT }).map((_, index) => (
      <PollCardSkeleton key={index} />
    ));
  };

  return (
    <div className="flex flex-col items-center justify-start justify-items-center w-full h-full pt-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 w-full items-center sm:items-start">
        <div className="flex w-full flex-col gap-2 row-start-2 items-center sm:items-start">
          {isPending ? renderSkeletons() : null}
          {error ? <div>"Error fetching data"</div> : null}

          {polls?.map((poll) => (
            <PollCard poll={poll} key={poll.id}></PollCard>
          ))}
        </div>
      </main>
    </div>
  );
}
