import { AnswerOption } from "@/types/answerOptions";
import { useMemo } from "react";

export const useGetAnswerOptions = (
  answerOptions: AnswerOption[] | undefined
) => {
  const [affirmativeOption, negativeOption] = useMemo(() => {
    if (!answerOptions) {
      return [];
    }

    const affirmativeOption = answerOptions.find(
      (option) => option.type === "affirmative"
    );

    const negativeOption = answerOptions.find(
      (option) => option.type === "negative"
    );

    return [affirmativeOption as AnswerOption, negativeOption as AnswerOption];
  }, [answerOptions]);

  return { affirmativeOption, negativeOption };
};
