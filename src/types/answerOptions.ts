import { TModel } from "./api";

enum EAnswerOptionType {
  Afirmative = "affirmative",
  Negative = "negative",
}

export type TAnswerOptionsBase = {
  uuid: string;
  text: string;
  type: EAnswerOptionType;
  userId: number;
};

export type TAnswerOptions = TModel<TAnswerOptionsBase>;
