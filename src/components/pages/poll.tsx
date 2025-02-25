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
import { InformationCard } from "../Information-card";

import { DeleteConfirmation } from "../delete-confirmation";
import { DeletePoll } from "../forms/delete-poll";
import { ResponsiveDialog } from "../responsive-dialog";
import { EditPoll } from "../forms/edit-poll";
import { ChartCard } from "../chart-card";
import { QrCard } from "../qr-card";
import { useGetAnswerOptions } from "@/hooks/use-get-answer-options";
import { useMemo } from "react";
import { useGenerateOptionUrl } from "@/hooks/use-generate-option-link";

export default function Poll() {
  const { pollId } = useParams();
  const { data: session } = useSession();
  const t = useTranslations("poll");
  const dialogTranslations = useTranslations("poll.editPollDialog");
  const pathname = usePathname();
  const generateOptionUrl = useGenerateOptionUrl();

  const {
    data: poll,
    isPending,
    error,
  } = useQuery({
    queryKey: ["polls", pollId],
    queryFn: () => getPollById({ pollId: pollId as string }),
    enabled: !!session?.jwt,
    select: (data) => data.data,
  });

  const { affirmativeOption, negativeOption } = useGetAnswerOptions(
    poll?.answerOptions
  );

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
        {}
        {/* <Button variant="outline" onClick={() => console.log("Edit button")}>
          {t("editButton")}
        </Button> */}
        <ResponsiveDialog
          label={t("editButton")}
          variant="outline"
          title={dialogTranslations("title")}
          description={dialogTranslations("description")}
          formComponent={<EditPoll poll={poll} />}
        />
        <DeleteConfirmation
          label={t("deleteButton")}
          variant="destructive"
          deleteComponent={<DeletePoll />}
        />
      </>
    );
  };

  const renderPollAnswerLink = (answerOption: AnswerOption) => {
    const { documentId, text } = answerOption;
    return <Link href={`${pathname}/${documentId}`}>{text}</Link>;
  };

  const cellCommonClasses =
    "bg-primary/10 w-full col-span-1 aspect-auto max-h-[300px] lg:max-h-none ";

  return (
    <div className="flex flex-col items-center justify-start w-full h-full max-h-full py-8 gap-6 font-[family-name:var(--font-geist-sans)]">
      <Headline title={title} buttonsContainer={<ButtonsContainer />} />

      <div className="grid lg:max-h-[900px] min-h-[700px] h-full w-full grid-rows-[repeat(7,minmax(250,1fr))] lg:grid-rows-[repeat(3,minmax(150,1fr))] grid-cols-1 lg:grid-cols-3 gap-3">
        <div className={cellCommonClasses}>
          <InformationCard />
        </div>
        <div className={cn(cellCommonClasses, "lg:col-span-2")}>
          <ChartCard title={t("mainChartTitle")} withTrendSection />
        </div>

        <div className={cn(cellCommonClasses, "lg:col-span-2")}>
          <ChartCard title={t("normalizedChartTitle")} />
        </div>
        <div className={cellCommonClasses}></div>

        <div className={cn(cellCommonClasses, "")}>
          <QrCard
            title="Affirmative Option"
            url={generateOptionUrl(affirmativeOption?.documentId)}
          />
        </div>
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
