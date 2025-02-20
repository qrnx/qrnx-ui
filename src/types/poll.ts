import { TAnswerOption } from "./answerOptions";
import { TModel } from "./api";

export type TPollBase = {
  title: string;
  description: string;
  userId: number;
  answerOptions: TAnswerOption[];
};

export type TPoll = TModel<TPollBase>;
