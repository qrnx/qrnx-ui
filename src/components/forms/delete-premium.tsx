"use client";

import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { ButtonLoading } from "../ui/button-loading";
import { useTranslations } from "next-intl";

interface DeletePremiumProps {
  onClose?: () => void;
}

export const DeletePremium = ({ onClose }: DeletePremiumProps) => {
  const t = useTranslations("premiumStatus.cancelPremium.cancelPremiumForm");
  const { mutate: deletePoll, isPending: isDeletePollPending } = useMutation(
    {}
  );

  const handleDelete = () => {
    deletePoll();
  };

  return (
    <div className="flex justify-between items-center gap-3">
      <Button onClick={() => onClose && onClose()} className="w-full">
        {t("cancel")}
      </Button>

      {isDeletePollPending ? (
        <ButtonLoading className="w-full bg-destructive" />
      ) : (
        <Button onClick={handleDelete} variant="destructive" className="w-full">
          {t("continue")}
        </Button>
      )}
    </div>
  );
};
