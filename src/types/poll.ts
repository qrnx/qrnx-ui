import { TAnswerOptions } from "./answerOptions";
import { TModel } from "./api";

export type TPollBase = {
  uuid: string;
  title: string;
  description: string;
  userId: number;
  answerOptions: TAnswerOptions[];
};

export type TPoll = TModel<TPollBase>;
