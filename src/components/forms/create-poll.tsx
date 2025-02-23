import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useTranslations } from "next-intl";
import { Textarea } from "../ui/textarea";

export const CreatePollForm = ({ className }: React.ComponentProps<"form">) => {
  const t = useTranslations("dashboard.createPollDialog");

  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="title">{t("titleLabel")}</Label>
        <Input type="title" id="title" placeholder={t("titlePlaceholder")} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">{t("descriptionLabel")}</Label>
        <Textarea id="description" placeholder={t("descriptionPlaceholder")} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="affirmative">{t("affirmativeLabel")}</Label>
        <Input id="affirmative" defaultValue={t("affirmativePlaceholder")} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="negative">{t("negativeLabel")}</Label>
        <Input id="negative" defaultValue={t("negativePlaceholder")} />
      </div>
      <Button type="submit">{t("create")}</Button>
    </form>
  );
};
