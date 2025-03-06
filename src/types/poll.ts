import { AnswerOption } from "./answerOptions";
import { Model } from "./api";

export type PollBase = {
  title: string;
  description: string;
  userId: number;
  answerOptions: AnswerOption[];
  totalResponses: number;
  affirmativeResponses: number;
  negativeResponses: number;
};

export type Poll = Model<PollBase>;
