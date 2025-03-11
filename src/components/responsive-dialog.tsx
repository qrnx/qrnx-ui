import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
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
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ComponentProps } from "react";
import { useTranslations } from "next-intl";

interface FormComponentProps extends ComponentProps<"form"> {
  onClose: () => void;
}

interface ResponsiveDialogProps extends ComponentProps<typeof Button> {
  label: string | React.ReactNode;
  variant?: ComponentProps<typeof Button>["variant"];
  title: string;
  description?: string;
  formComponent: React.ReactNode;
}

export function ResponsiveDialog(props: ResponsiveDialogProps) {
  const {
    label,
    title,
    description,
    variant = "default",
    formComponent,
    ...otherProps
  } = props;
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const t = useTranslations("dialogCommon");

  const handleClose = () => {
    setOpen(false);
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={variant} {...otherProps}>
            {label}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <div>
            {React.isValidElement(formComponent) &&
              React.cloneElement(formComponent, {
                onClose: handleClose,
              } as FormComponentProps)}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={variant} {...otherProps}>
          {label}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        <div className="px-4">
          {React.isValidElement(formComponent) &&
            React.cloneElement(formComponent, {
              onClose: handleClose,
            } as FormComponentProps)}
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">{t("cancel")}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
