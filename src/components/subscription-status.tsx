import { useTranslations } from "next-intl";
import { GetPremium } from "./forms/get-premium";
import { ResponsiveDialog } from "./responsive-dialog";

interface SubscriptionStatusProps {
  title: string;
  hasSubscription: boolean;
}

export const SubscriptionStatus = ({
  title,
  hasSubscription,
}: SubscriptionStatusProps) => {
  const t = useTranslations("userNav.getPremium.getPremiumForm");

  if (!hasSubscription) {
    return (
      <ResponsiveDialog
        label={title}
        title={title}
        variant={"ghost"}
        description={t("description")}
        formComponent={<GetPremium />}
        className="flex size-full justify-start py-1.5 px-2"
      />
    );
  }
  return null;
};
