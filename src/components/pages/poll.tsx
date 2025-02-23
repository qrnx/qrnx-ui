"use client";

import { useQuery } from "@tanstack/react-query";
import { getPollById } from "@/api/polls";
import { useParams, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { AnswerOption } from "@/types/answerOptions";
import Link from "next/link";
import { cn } from "@/lib/utils";

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

  const cellCommonClasses =
    "bg-primary/10 w-full col-span-1 aspect-square sm:aspect-2/1 lg:aspect-auto max-h-[300px] ";

  return (
    <div className="flex flex-col items-center justify-start w-full h-full max-h-full py-8 gap-2 font-[family-name:var(--font-geist-sans)]">
      <h1>{title} Page</h1>
      <div>
        {answerOptions.map((answerOption) => (
          <div key={answerOption.id}>{renderPollAnswerLink(answerOption)}</div>
        ))}
      </div>
      <div className="grid max-h-[900px] min-h-[700px] h-full w-full grid-rows-[repeat(autofit,minmax(150,1fr))] grid-cols-1 lg:grid-cols-3 gap-3">
        <div className={cellCommonClasses}></div>
        <div className={cn(cellCommonClasses, "lg:col-span-2")}></div>

        <div className={cn(cellCommonClasses, "lg:col-span-2")}></div>
        <div className={cellCommonClasses}></div>

        <div className={cellCommonClasses}></div>
        <div className={cellCommonClasses}></div>
        <div className={cellCommonClasses}></div>
      </div>
    </div>
  );
}
