"use client";

import { useQuery } from "@tanstack/react-query";
import { getPollById } from "@/api/polls";
import { useParams, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { AnswerOption } from "@/types/answerOptions";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Headline } from "../ui/headline";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { InformationCard } from "../ui/Information-card";

import { DeleteConfirmation } from "../ui/delete-confirmation";
import { DeletePollForm } from "../forms/delete-poll";
import { MainChartCard } from "../main-chart-card";

export default function Poll() {
  const { pollId } = useParams();
  const { data: session } = useSession();
  const t = useTranslations("poll");
  const pathname = usePathname();

  const {
    data: poll,
    isPending,
    error,
  } = useQuery({
    queryKey: ["poll", pollId],
    queryFn: () => getPollById({ pollId: pollId as string }),
    enabled: !!session?.jwt,
    select: (data) => data.data,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  const { title, answerOptions } = poll;

  const ButtonsContainer = () => {
    return (
      <>
        {/* eslint-disable-next-line no-console */}
        <Button onClick={() => console.log("Download PDF button")}>
          {t("pdfButton")}
        </Button>
        {/* eslint-disable-next-line no-console */}
        <Button variant="outline" onClick={() => console.log("Edit button")}>
          {t("editButton")}
        </Button>
        <DeleteConfirmation
          label={t("deleteButton")}
          variant="destructive"
          deleteComponent={<DeletePollForm />}
        />
      </>
    );
  };

  const renderPollAnswerLink = (answerOption: AnswerOption) => {
    const { documentId, text } = answerOption;
    return <Link href={`${pathname}/${documentId}`}>{text}</Link>;
  };

  const cellCommonClasses =
    "bg-primary/10 w-full col-span-1 aspect-square sm:aspect-2/1 lg:aspect-auto  ";

  return (
    <div className="flex flex-col items-center justify-start w-full h-full max-h-full py-8 gap-6 font-[family-name:var(--font-geist-sans)]">
      <Headline title={title} buttonsContainer={<ButtonsContainer />} />

      <div className="grid max-h-[900px] min-h-[700px] h-full w-full grid-rows-[repeat(3,minmax(150,1fr))] grid-cols-1 lg:grid-cols-3 gap-3">
        <div className={cellCommonClasses}>
          <InformationCard />
        </div>
        <div className={cn(cellCommonClasses, "lg:col-span-2")}>
          <MainChartCard />
        </div>

        <div className={cn(cellCommonClasses, "lg:col-span-2")}></div>
        <div className={cellCommonClasses}></div>

        <div className={cellCommonClasses}></div>
        <div className={cellCommonClasses}></div>
        <div className={cellCommonClasses}></div>
      </div>

      <div>
        {answerOptions.map((answerOption) => (
          <div key={answerOption.id}>{renderPollAnswerLink(answerOption)}</div>
        ))}
      </div>
    </div>
  );
}
