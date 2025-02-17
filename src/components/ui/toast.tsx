"use client";

import React, { ComponentProps } from "react";
import { toast as sonnerToast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "./button";

interface ToastProps {
  id: string | number;
  title: string;
  description: string;
  variant?: ComponentProps<typeof Alert>["variant"];
  icon?: React.ReactNode;
  button?: {
    label: string;
    onClick: () => void;
  };
}

export const Toast = (props: ToastProps) => {
  const { title, description, button, icon, variant = "default", id } = props;

  return (
    <Alert variant={variant} className="bg-background">
      {icon ?? <AlertCircle className="h-4 w-4" />}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
      {button && (
        <Button
          className="rounded bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600 hover:bg-indigo-100"
          onClick={() => {
            button.onClick();
            sonnerToast.dismiss(id);
          }}
        >
          {button.label}
        </Button>
      )}
    </Alert>
  );
};
