"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getPolls } from "@/api/polls";
import { PollCard, PollCardSkeleton } from "@/components/ui/poll-card";
import { Headline } from "../ui/headline";
import { Button } from "../ui/button";
import { CircleHelp } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

export default function Dashboard() {
  const { data: session } = useSession();
  const t = useTranslations("headline");

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

  const ButtonsContainer = () => {
    return (
      <>
        <div className="flex gap-3">
          <div className="flex gap-2">
            <div className="text-muted-foreground font-medium self-center text-lg">
              3 / {polls?.length}
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CircleHelp className="size-4 self-center text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Blablalblallsl</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <Button onClick={() => console.log("test")}>
              {t("createPoll")}
            </Button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col items-center justify-start justify-items-center w-full h-fit max-h-full py-8 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 justify-between w-full">
        <Headline title={t("tittle")} buttonsContainer={<ButtonsContainer />} />
        <div className="flex flex-col gap-4 row-start-2 w-full items-center sm:items-start">
          <div className="flex w-full flex-col gap-2 row-start-2 items-center sm:items-start">
            {isPending ? renderSkeletons() : null}
            {error ? <div>"Error fetching data"</div> : null}
            {polls?.map((poll) => (
              <PollCard poll={poll} key={poll.id}></PollCard>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
