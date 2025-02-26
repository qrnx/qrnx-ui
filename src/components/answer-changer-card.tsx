import { Card } from "./ui/card";
import { EditAnswerOptionForm } from "./forms/edit-answer-option";
import { useTranslations } from "next-intl";

export const AnswerChanger = () => {
  const t = useTranslations("editAnswerOptionCard");
  return (
    <Card className="flex flex-col justify-between h-full p-4">
      <div className="text-xl sm:text-2xl font-semibold">{t("tittle")}</div>
      <div className="flex flex-col gap-3.5">
        <EditAnswerOptionForm />
      </div>
    </Card>
  );
};
