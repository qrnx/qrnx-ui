import { TModel } from "./api";

enum EAnswerOptionType {
  Afirmative = "affirmative",
  Negative = "negative",
}

export type TAnswerOptionsBase = {
  text: string;
  type: EAnswerOptionType;
  userId: number;
};

export type TAnswerOptions = TModel<TAnswerOptionsBase>;
