import { useTranslations } from "next-intl";
import { GetPremium } from "./forms/get-premium";
import { ResponsiveDialog } from "./responsive-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

interface SubscriptionStatusProps {
  hasSubscription: boolean;
}

export const SubscriptionStatus = ({
  hasSubscription,
}: SubscriptionStatusProps) => {
  const t = useTranslations("premiumStatus");

  if (!hasSubscription) {
    return (
      <ResponsiveDialog
        label={t("getPremium.getPremiumTitle")}
        title={t("getPremium.getPremiumTitle")}
        variant={"ghost"}
        description={t("getPremium.getPremiumForm.description")}
        formComponent={<GetPremium />}
        className="flex size-full justify-start py-1.5 px-2"
      />
    );
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger className="size-full">
        <Button
          variant={"ghost"}
          className="flex size-full justify-start py-1.5 px-2"
        >
          {t("cancelPremium.cancelPremiumTittle")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("cancelPremium.cancelPremiumForm.title")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("cancelPremium.cancelPremiumForm.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {t("cancelPremium.cancelPremiumForm.cancelButton")}
          </AlertDialogCancel>
          <AlertDialogAction onClick={console.log("hui")}>
            {t("cancelPremium.cancelPremiumForm.continueButton")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
