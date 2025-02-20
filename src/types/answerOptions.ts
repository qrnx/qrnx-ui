import { TModel } from "./api";

enum EAnswerOptionType {
  Afirmative = "affirmative",
  Negative = "negative",
}

export type TAnswerOptionBase = {
  text: string;
  type: EAnswerOptionType;
  userId: number;
};

export type TAnswerOption = TModel<TAnswerOptionBase>;
