import { AnswerOption } from "./answerOptions";
import { Model } from "./api";

export type PollBase = {
  title: string;
  description: string;
  userId: number;
  answerOptions: AnswerOption[];
};

export type Poll = Model<PollBase>;
