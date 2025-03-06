import { useTranslations } from "next-intl";
import { GetPremium } from "./forms/get-premium";
import { ResponsiveDialog } from "./responsive-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import React, { ComponentProps } from "react";

interface SubscriptionStatusProps extends ComponentProps<typeof Button> {
  variant?: ComponentProps<typeof Button>["variant"];
  title?: string;
  description?: string;
  deleteComponent: React.ReactNode;
  hasSubscription: boolean;
}

interface DeletePremiumProps {
  onClose?: () => void;
}

export function SubscriptionStatus(props: SubscriptionStatusProps) {
  const t = useTranslations("premiumStatus");
  const { variant = "ghost", deleteComponent, hasSubscription } = props;
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

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
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={variant}
            className="flex size-full justify-start py-1.5 px-2"
          >
            {t("cancelPremium.cancelPremiumTittle")}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[512px]">
          <DialogHeader>
            <DialogTitle>
              {t("cancelPremium.cancelPremiumForm.title")}
            </DialogTitle>
            {t("cancelPremium.cancelPremiumForm.description") && (
              <DialogDescription>
                {t("cancelPremium.cancelPremiumForm.description")}
              </DialogDescription>
            )}
          </DialogHeader>
          <div>
            {React.isValidElement(deleteComponent) &&
              React.cloneElement(deleteComponent, {
                onClose: handleClose,
              } as DeletePremiumProps)}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant={variant}
          className="flex size-full justify-start py-1.5 px-2"
        >
          {t("cancelPremium.cancelPremiumTittle")}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>
            {t("cancelPremium.cancelPremiumForm.title")}
          </DrawerTitle>
          {t("cancelPremium.cancelPremiumForm.description") && (
            <DrawerDescription>
              {t("cancelPremium.cancelPremiumForm.description")}
            </DrawerDescription>
          )}
        </DrawerHeader>
        <div className="px-4">
          {React.isValidElement(deleteComponent) &&
            React.cloneElement(deleteComponent, {
              onClose: handleClose,
            } as DeletePremiumProps)}
        </div>
        <DrawerFooter className="pt-2"></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
