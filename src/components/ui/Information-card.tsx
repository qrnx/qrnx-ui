import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Users, Percent, Calendar } from "lucide-react";

export const InformationCard = () => {
  const t = useTranslations("informationCard");
  return (
    <Card className="flex flex-col justify-between h-full">
      <CardHeader className="flex gap-3">
        <CardTitle className="text-2xl font-semibold">{t("general")}</CardTitle>
        <CardDescription className="text-sm font-medium text-primary">
          The "Tastes of the World" restaurant offers delicious cuisine and a
          warm atmosphere
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1.5">
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
          <div>{t("date")}: 12.04.2025</div>
        </div>
      </CardContent>
    </Card>
  );
};
