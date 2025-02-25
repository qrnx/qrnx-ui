import { Model } from "./api";

enum AnswerOptions {
  Afirmative = "affirmative",
  Negative = "negative",
}

export type AnswerOptionBase = {
  text: string;
  type: AnswerOptions;
  userId: number;
};

export type AnswerOption = Model<AnswerOptionBase>;
