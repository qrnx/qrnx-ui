"use client";

import { useQuery } from "@tanstack/react-query";
import { getPollById } from "@/api/polls";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Headline } from "../ui/headline";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { InformationCard } from "../Information-card";
import { notFound } from "next/navigation";

import { DeleteConfirmation } from "../delete-confirmation";
import { DeletePoll } from "../forms/delete-poll";
import { ResponsiveDialog } from "../responsive-dialog";
import { EditPoll } from "../forms/edit-poll";
import { ChartCard } from "../chart-card";
import { QrCard } from "../qr-card";
import { useGetAnswerOptions } from "@/hooks/use-get-answer-options";
import { useGenerateOptionUrl } from "@/hooks/use-generate-option-link";
import { DonutChart } from "../donut-card";
import { AnswerChanger } from "../answer-changer-card";
import { Skeleton } from "../ui/skeleton";
import { ChartCardNormalized } from "../chart-card-normalized";
import { useMediaQuery } from "@/hooks/use-media-query";
import { FileDown, Pencil, Trash2 } from "lucide-react";
import React from "react";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import { PdfDocument } from "../pdf-document";
import { QRCodeCanvas } from "qrcode.react";
import { ButtonLoading } from "../ui/button-loading";
import { useGerateQrBase64 } from "@/hooks/useGerateQrBase64";

export default function Poll() {
  const { pollId } = useParams();
  const { data: session } = useSession();
  const t = useTranslations("poll");
  const answerOptionTranslations = useTranslations("answerOption");
  const dialogTranslations = useTranslations("poll.editPollDialog");
  const generateOptionUrl = useGenerateOptionUrl();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const affirmativeRef = React.useRef<HTMLCanvasElement>(null);
  const negativeRef = React.useRef<HTMLCanvasElement>(null);

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

  const { affirmativeImage, negativeImage } = useGerateQrBase64({
    affirmativeRef,
    negativeRef,
    affirmativeOption,
    negativeOption,
  });

  const cellCommonClasses =
    " w-full col-span-1 aspect-auto max-h-[300px] lg:max-h-none ";

  const renderSkeleton = () => {
    return (
      <div className="flex flex-col items-center justify-start w-full h-full max-h-full py-8 gap-6 font-[family-name:var(--font-geist-sans)]">
        <Skeleton className="w-full h-9 sm:h-10" />

        <div className="grid lg:max-h-[900px] min-h-[700px] h-full w-full grid-rows-[repeat(7,minmax(250,1fr))] lg:grid-rows-[repeat(3,minmax(150,1fr))] grid-cols-1 lg:grid-cols-3 gap-3">
          <div className={cellCommonClasses}>
            <Skeleton className="w-full h-full" />
          </div>
          <div className={cn(cellCommonClasses, "lg:col-span-2")}>
            <Skeleton className="w-full h-full" />
          </div>

          <div className={cn(cellCommonClasses, "lg:col-span-2")}>
            <Skeleton className="w-full h-full" />
          </div>
          <div className={cellCommonClasses}>
            <Skeleton className="w-full h-full" />
          </div>

          <div className={cn(cellCommonClasses, "")}>
            <Skeleton className="w-full h-full" />
          </div>
          <div className={cellCommonClasses}>
            <Skeleton className="w-full h-full" />
          </div>
          <div className={cellCommonClasses}>
            <Skeleton className="w-full h-full" />
          </div>
        </div>
      </div>
    );
  };

  if (isPending) return renderSkeleton();
  if (error) return notFound();

  const handleDownload = async () => {
    const fileName = "test.pdf";
    const blob = await pdf(
      <PdfDocument
        title={answerOptionTranslations("pdfTitle")}
        affirmativeUrl={affirmativeImage}
        negativeUrl={negativeImage}
        affirmativeText={affirmativeOption?.text || ""}
        negativeText={negativeOption?.text || ""}
      />
    ).toBlob();
    saveAs(blob, fileName);
  };

  const { title, totalResponses, affirmativeResponses, negativeResponses } =
    poll;
  const ButtonsContainer = () => {
    const downloadButtonLabel = isDesktop ? t("pdfButton") : <FileDown />;
    const editButtonLabel = isDesktop ? t("editButton") : <Pencil />;
    const deleteButtonLabel = isDesktop ? t("deleteButton") : <Trash2 />;

    return (
      <>
        {!affirmativeImage || !negativeImage ? (
          <ButtonLoading />
        ) : (
          <Button
            onClick={handleDownload}
            size={isDesktop ? "default" : "icon"}
          >
            {downloadButtonLabel}
          </Button>
        )}
        <ResponsiveDialog
          label={editButtonLabel}
          variant="outline"
          title={dialogTranslations("title")}
          description={dialogTranslations("description")}
          size={isDesktop ? "default" : "icon"}
          formComponent={<EditPoll poll={poll} />}
        />
        <DeleteConfirmation
          label={deleteButtonLabel}
          variant="destructive"
          size={isDesktop ? "default" : "icon"}
          deleteComponent={<DeletePoll />}
        />
      </>
    );
  };

  return (
    <div className="flex flex-col items-center justify-start w-full h-full max-h-full py-8 gap-6 font-[family-name:var(--font-geist-sans)]">
      <Headline title={title} buttonsContainer={<ButtonsContainer />} />

      <div className="grid lg:max-h-[900px] min-h-[700px] h-full w-full grid-rows-[repeat(7,minmax(250,1fr))] lg:grid-rows-[repeat(3,minmax(150,1fr))] grid-cols-1 lg:grid-cols-3 gap-3">
        <div className={cellCommonClasses}>
          <InformationCard poll={poll} />
        </div>
        <div className={cn(cellCommonClasses, "lg:col-span-2")}>
          <ChartCard poll={poll} title={t("mainChartTitle")} withTrendSection />
        </div>

        <div className={cn(cellCommonClasses, "lg:col-span-2")}>
          <ChartCardNormalized poll={poll} title={t("normalizedChartTitle")} />
        </div>
        <div className={cellCommonClasses}>
          <DonutChart
            totalResponses={totalResponses}
            affirmativeResponses={affirmativeResponses}
            negativeResponses={negativeResponses}
          />
        </div>

        <div className={cn(cellCommonClasses, "")}>
          <QrCard
            title={t("affirmativeOption")}
            url={generateOptionUrl(affirmativeOption?.documentId)}
            type="affirmative"
          />
        </div>
        <div className={cellCommonClasses}>
          <QrCard
            title={t("negativeOption")}
            url={generateOptionUrl(negativeOption?.documentId)}
            type="negative"
          />
        </div>
        <div className={cellCommonClasses}>
          <AnswerChanger
            poll={poll}
            affirmativeOption={affirmativeOption}
            negativeOption={negativeOption}
          />
        </div>
        <QRCodeCanvas
          ref={affirmativeRef}
          value={generateOptionUrl(affirmativeOption?.documentId)}
          size={600}
          title={title}
          style={{ display: "none" }}
        />
        <QRCodeCanvas
          ref={negativeRef}
          value={generateOptionUrl(negativeOption?.documentId)}
          size={600}
          title={title}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}
