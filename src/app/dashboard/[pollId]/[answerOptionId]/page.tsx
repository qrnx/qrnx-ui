"use client";

import { useQuery } from "@tanstack/react-query";
import { getPollById } from "@/api/polls";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { AnswerOption } from "@/types/answerOptions";
import { useEffect } from "react";

export default function AnswerPage() {
  const { answerOptionId, pollId } = useParams();
  const { data: session } = useSession();

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
    queryKey: ["poll", pollId],
    queryFn: () => getPollById(pollId as string),
    enabled: !!session?.jwt,
    select: (data) => {
      const poll = data.data;
      const answerOption = poll.answerOptions.find(
        (answerOption) => answerOption.documentId === answerOptionId
      );
      return answerOption as AnswerOption;
    },
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  const { text, type } = answerOption;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1>{answerOptionId}</h1>
      <div>Answer: {text}</div>
      <div>Answer type: {type}</div>
    </div>
  );
}
