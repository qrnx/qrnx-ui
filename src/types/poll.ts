import { TAnswerOption } from "./answerOptions";
import { TModel } from "./api";

export type PollBase = {
  title: string;
  description: string;
  userId: number;
  answerOptions: TAnswerOption[];
};

export type Poll = TModel<PollBase>;
