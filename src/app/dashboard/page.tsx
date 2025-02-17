"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { routes } from "@/config/routes";
import { useQuery } from "@tanstack/react-query";
import { getPolls } from "@/api/polls";

export default function Dashboard() {
  const { data: session, status } = useSession();

  const {
    data: polls,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["polls"],
    queryFn: getPolls,
    enabled: !!session?.jwt,
    select: (data) => data.data,
  });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
          <div>{session && session.user?.email}</div>
          <div>{status}</div>
        </div>

        <div className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
          <div>{isLoading ? "Loading..." : null}</div>
          <div>{error ? "Error fetching data" : null}</div>

          {polls?.map((poll) => (
            <div key={poll.id}>{poll.title}</div>
          ))}
        </div>

        <Button
          onClick={() => signOut({ callbackUrl: routes.home })}
          variant="outline"
          className="w-full cursor-pointer"
        >
          Logout
        </Button>
      </main>
    </div>
  );
}
