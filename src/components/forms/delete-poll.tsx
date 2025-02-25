"use client";

import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePoll as deletePollRequest } from "@/api/polls";
import { ButtonLoading } from "../ui/button-loading";
import { useParams, useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { toast } from "sonner";

interface DeletePollProps {
  onClose?: () => void;
}

export const DeletePoll = ({ onClose }: DeletePollProps) => {
  const { pollId } = useParams();
  const t = useTranslations("deleteDialog");
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: deletePoll, isPending: isDeletePollPending } = useMutation({
    mutationFn: deletePollRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["polls"],
      });
      queryClient.invalidateQueries({
        queryKey: ["polls", pollId],
      });
      if (onClose) {
        onClose();
      }
      router.replace(ROUTES.dashboard);
      toast.success(t("success"));
    },

    onError: () => {
      toast.error(t("error"));
    },
  });

  const handleDelete = () => {
    deletePoll({ pollId: pollId as string });
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
          {t("delete")}
        </Button>
      )}
    </div>
  );
};
