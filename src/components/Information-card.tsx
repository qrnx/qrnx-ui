import { useTranslations } from "next-intl";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { Users, Percent, Calendar } from "lucide-react";
import { Poll } from "@/types/poll";

interface InformationCardProps {
  poll: Poll;
}

export const InformationCard = ({ poll }: InformationCardProps) => {
  const t = useTranslations("informationCard");
  const { description, createdAt } = poll;
  const date = new Date(createdAt);
  const formattedDate = new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);

  return (
    <Card className="flex flex-col justify-between gap-8 h-full p-4">
      <div className="flex flex-col gap-3">
        <CardTitle className="text-xl sm:text-2xl font-semibold">
          {t("general")}
        </CardTitle>
        {description && (
          <CardDescription className="text-sm font-medium text-primary">
            {description}
          </CardDescription>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex gap-2">
          <Users />
          <div>{t("total")}: 503</div>
        </div>
        <div className="flex gap-2">
          <Percent />
          <div>{t("responses")}: 0.54</div>
        </div>
        <div className="flex gap-2">
          <Calendar />
          <div>
            {t("date")}: {formattedDate}
          </div>
        </div>
      </div>
    </Card>
  );
};
