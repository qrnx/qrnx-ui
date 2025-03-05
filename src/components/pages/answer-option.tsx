"use client";

import { useQuery } from "@tanstack/react-query";
import { getPollById } from "@/api/polls";
import { notFound, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { AnswerOption as AnswerOptionType } from "@/types/answerOptions";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function AnswerOption() {
  const { answerOptionId, pollId } = useParams();
  const { data: session } = useSession();
  const t = useTranslations("answerOption");

  useEffect(() => {
    const requestBody = { answerOptionId, pollId };

    fetch("/api/response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
  }, [answerOptionId, pollId]);

  const {
    data: answerOption,
    isPending,
    error,
  } = useQuery({
    queryKey: ["polls", pollId],
    queryFn: () => getPollById({ pollId: pollId as string }),
    enabled: !!session?.jwt,
    select: (data) => {
      const poll = data.data;
      const answerOption = poll.answerOptions.find(
        (answerOption) => answerOption.documentId === answerOptionId
      );
      return answerOption as AnswerOptionType;
    },
  });

  if (isPending) return <div>Loading...</div>;
  if (error || !answerOption) return notFound();

  const { text } = answerOption;

  return (
    <div className="flex flex-col items-center justify-items-center w-full h-full py-8 gap-16 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col grow items-center justify-center gap-4 w-full">
        <div className="flex flex-col items-center justify-center gap-6 text-6xl">
          <div className="font-extrabold">{t("title")}</div>
          <div className="flex flex-col items-center font-medium gap-7">
            <div>{t("yourAnswer")}</div>
            <div>{text}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
