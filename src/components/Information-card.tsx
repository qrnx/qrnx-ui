import { useTranslations } from "next-intl";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { Users, Percent, Calendar } from "lucide-react";

interface Poll {
  createdAt: string;
  description: string;
}

interface InformationCardProps {
  pollData: Poll;
}

export const InformationCard: React.FC<InformationCardProps> = ({
  pollData,
}) => {
  const t = useTranslations("informationCard");
  const isoDate = pollData.createdAt;
  const date = new Date(isoDate);
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
        <CardDescription className="text-sm font-medium text-primary">
          {pollData.description}
        </CardDescription>
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
