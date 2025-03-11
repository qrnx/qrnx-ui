"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notFound, useParams } from "next/navigation";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { getAnswerOptionById } from "@/api/answerOptions";
import { createResponse as createResponseApi } from "@/api/responses";
import { Loader2 } from "lucide-react";

export default function AnswerOption() {
  const { answerOptionId, pollId } = useParams();
  const t = useTranslations("answerOption");
  const queryClient = useQueryClient();

  const { mutate: createResponse, isPending: isCreateResponsePending } =
    useMutation({
      mutationFn: createResponseApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["polls"] });
        queryClient.invalidateQueries({
          queryKey: ["polls", pollId],
        });
      },
    });

  useEffect(() => {
    if (answerOptionId && pollId) {
      createResponse({
        pollId: pollId as string,
        answerOptionId: answerOptionId as string,
      });
    }
  }, [answerOptionId, createResponse, pollId]);

  const {
    data: answerOption,
    isPending,
    error,
  } = useQuery({
    queryKey: ["answerOptions", answerOptionId],
    queryFn: () =>
      getAnswerOptionById({ answerOptionId: answerOptionId as string }),
  });

  if (isPending || isCreateResponsePending)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader2 size={100} className="animate-spin" />
      </div>
    );
  if (error || !answerOption) return notFound();

  const { text } = answerOption;

  return (
    <div className="flex flex-col items-center justify-items-center w-full h-full py-8 gap-16 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col grow items-center justify-center gap-4 w-full">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="font-extrabold text-3xl md:text-6xl">
            {t("title")}
          </div>
          <div className="flex flex-col items-center font-medium gap-7 text-2xl md:text-5xl">
            <div>{t("yourAnswer")}</div>
            <div>{text}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
