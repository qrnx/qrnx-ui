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
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ComponentProps } from "react";
import { useTranslations } from "next-intl";

interface DeleteComponentProps extends ComponentProps<"form"> {
  onClose: () => void;
}

interface DeleteConfirmationProps extends ComponentProps<typeof Button> {
  label: string;
  variant?: ComponentProps<typeof Button>["variant"];
  title?: string;
  description?: string;
  deleteComponent: React.ReactNode;
}

export function DeleteConfirmation(props: DeleteConfirmationProps) {
  const t = useTranslations("deleteDialog");
  const {
    label,
    variant = "default",
    title = t("title"),
    description = t("description"),
    deleteComponent,
    ...otherProps
  } = props;
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

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
        <DialogContent className="sm:max-w-[512px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <div>
            {React.isValidElement(deleteComponent) &&
              React.cloneElement(deleteComponent, {
                onClose: handleClose,
              } as DeleteComponentProps)}
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
        <div className="px-4 flex justify-between items-center gap-3">
          {React.isValidElement(deleteComponent) &&
            React.cloneElement(deleteComponent, {
              onClose: handleClose,
            } as DeleteComponentProps)}
        </div>
        <DrawerFooter className="pt-2"></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
