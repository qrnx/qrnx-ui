"use client";

import { useQuery } from "@tanstack/react-query";
import { getPollById } from "@/api/polls";
import { useParams, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { AnswerOption } from "@/types/answerOptions";
import Link from "next/link";

export default function Poll() {
  const { pollId } = useParams();
  const { data: session } = useSession();
  const pathname = usePathname();

  const {
    data: poll,
    isPending,
    error,
  } = useQuery({
    queryKey: ["poll", pollId],
    queryFn: () => getPollById(pollId as string),
    enabled: !!session?.jwt,
    select: (data) => data.data,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  const { title, answerOptions } = poll;

  const renderPollAnswerLink = (answerOption: AnswerOption) => {
    const { documentId, text } = answerOption;
    return <Link href={`${pathname}/${documentId}`}>{text}</Link>;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1>{title} Page</h1>

      <div>
        {answerOptions.map((answerOption) => (
          <div key={answerOption.id}>{renderPollAnswerLink(answerOption)}</div>
        ))}
      </div>
    </div>
  );
}
