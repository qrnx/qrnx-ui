"use client";

import { useQuery } from "@tanstack/react-query";
import { getPolls } from "@/api/polls";
import { PollCard, PollCardSkeleton } from "@/components/poll-card";
import { Headline } from "../ui/headline";
import { CircleHelp, SquarePen } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Skeleton } from "../ui/skeleton";
import { ResponsiveDialog } from "../responsive-dialog";
import { CreatePoll } from "../forms/create-poll";
import useGetUser from "@/hooks/use-get-user";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function Dashboard() {
  const t = useTranslations("dashboard");
  const dialogTranslations = useTranslations("dashboard.createPollDialog");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { maxPolls, isLoading: isUserLoading } = useGetUser();

  const {
    data: polls,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["polls"],
    queryFn: getPolls,
    select: (data) => data.data,
  });

  const SKELETONS_AMOUNT = 3;

  const renderSkeletons = () => {
    return Array.from({ length: SKELETONS_AMOUNT }).map((_, index) => (
      <PollCardSkeleton key={index} />
    ));
  };

  const isAbleToCreatePoll = polls && polls?.length < maxPolls;

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
    const createButtonLabel = isDesktop ? (
      t("headline.createPoll")
    ) : (
      <SquarePen />
    );

    return (
      <>
        <div className="flex items-center gap-1.5 md:gap-2">
          <div className="font-medium text-lg">
            {isFetching || isUserLoading || !polls ? (
              <Skeleton className="w-[40px] h-[24px] rounded-sm" />
            ) : (
              `${polls?.length} / ${maxPolls}`
            )}
          </div>
          <TooltipToRender />
        </div>

        <ResponsiveDialog
          label={createButtonLabel}
          title={dialogTranslations("title")}
          description={dialogTranslations("description")}
          formComponent={<CreatePoll />}
          disabled={!isAbleToCreatePoll}
          size={isDesktop ? "default" : "icon"}
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
            {error ? <div>"Error fetching data"</div> : null}

            {isFetching
              ? renderSkeletons()
              : polls?.map((poll) => (
                  <PollCard poll={poll} key={poll.id}></PollCard>
                ))}
          </div>
        </div>
      </main>
    </div>
  );
}
