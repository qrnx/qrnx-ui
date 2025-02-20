import { AnswerOption } from "./answerOptions";
import { TModel } from "./api";

export type PollBase = {
  title: string;
  description: string;
  userId: number;
  answerOptions: AnswerOption[];
};

export type Poll = TModel<PollBase>;
