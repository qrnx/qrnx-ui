import { useTranslations } from "next-intl";
import { GetPremium } from "./forms/get-premium";
import { ResponsiveDialog } from "./responsive-dialog";

interface SubscriptionStatusProps {
  title: string;
}

export const SubscriptionStatus = ({ title }: SubscriptionStatusProps) => {
  const t = useTranslations("userNav.getPremium.getPremiumForm");
  return (
    <ResponsiveDialog
      label={title}
      title={title}
      variant={"ghost"}
      description={t("description")}
      formComponent={<GetPremium />}
      className="flex size-full justify-start p-1.5"
    />
  );
};
