import { AnswerOption } from "@/types/answerOptions";

export type GetAnswerOptionByIdParams = {
  answerOptionId: string;
};

export const getAnswerOptionById = async ({
  answerOptionId,
}: GetAnswerOptionByIdParams): Promise<AnswerOption> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/answer-options/${answerOptionId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  return data.data;
};
