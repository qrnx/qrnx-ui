import { Model } from "./api";

enum AnswerOptionType {
  Afirmative = "affirmative",
  Negative = "negative",
}

export type AnswerOptionBase = {
  text: string;
  type: AnswerOptionType;
  userId: number;
};

export type AnswerOption = Model<AnswerOptionBase>;
