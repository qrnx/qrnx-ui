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
} from "../ui/tooltip";
import { MAX_AVAILABLE_POLLS } from "@/config/availablePolls";
import { Skeleton } from "../ui/skeleton";
import { ResponsiveDialog } from "../ui/responsive-dialog";
import { CreatePollForm } from "../forms/create-poll";

export default function Dashboard() {
  const { data: session } = useSession();
  const t = useTranslations("dashboard");
  const dialogTranslations = useTranslations("dashboard.createPollDialog");

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

  const isAbleToCreatePoll = polls && polls?.length < MAX_AVAILABLE_POLLS;

  const TooltipToRender = () => {
    return (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger>
            <CircleHelp size={16} />
          </TooltipTrigger>
          <TooltipContent side="bottom" className="whitespace-pre-line">
            <p>{t("headline.counterHelp")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  const ButtonsContainer = () => {
    return (
      <>
        <div className="flex items-center gap-1.5 md:gap-3">
          <div className="font-medium text-lg">
            {isPending || !polls ? (
              <Skeleton className="w-[40px] h-[24px] rounded-sm" />
            ) : (
              `${polls?.length} / ${MAX_AVAILABLE_POLLS}`
            )}
          </div>
          <TooltipToRender />
        </div>

        <ResponsiveDialog
          label={t("headline.createPoll")}
          title={dialogTranslations("title")}
          description={dialogTranslations("description")}
          formComponent={<CreatePollForm />}
        />
      </>
    );
  };

  return (
    <div className="flex flex-col items-center justify-start justify-items-center w-full h-fit max-h-full py-8 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 justify-between w-full">
        <Headline
          title={t("headline.title")}
          buttonsContainer={<ButtonsContainer />}
        />
        <div className="flex flex-col gap-4 row-start-2 w-full items-center sm:items-start">
          <div className="flex w-full flex-col gap-3 row-start-2 items-center sm:items-start">
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
