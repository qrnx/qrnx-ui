import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { deletePoll as deletePollRequest } from "@/api/polls";
import queryClient from "@/lib/queryClient";
import { ButtonLoading } from "../ui/button-loading";
import { useParams, useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";

interface DeletePollFormProps {
  onClose?: () => void;
}

export const DeletePollForm = ({ onClose }: DeletePollFormProps) => {
  const { pollId } = useParams();
  const t = useTranslations("deleteDialog");
  const router = useRouter();

  const { mutate: deletePoll, isPending: isDeletePollPending } = useMutation({
    mutationFn: deletePollRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["polls"],
      });
      if (onClose) {
        onClose();
      }
      router.replace(ROUTES.dashboard);
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
