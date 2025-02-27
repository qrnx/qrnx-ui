import { Card } from "./ui/card";
import { EditAnswerOptionForm } from "./forms/edit-answer-option";
import { useTranslations } from "next-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { editPoll } from "@/api/polls";
import { useParams } from "next/navigation";
import { Poll } from "@/types/poll";
import { AnswerOption } from "@/types/answerOptions";

interface AnswerChangerProps {
  poll: Poll;
  affirmativeOption: AnswerOption | undefined;
  negativeOption: AnswerOption | undefined;
}

export const AnswerChanger = ({
  poll,
  affirmativeOption,
  negativeOption,
}: AnswerChangerProps) => {
  const t = useTranslations("poll.editAnswerOptionCard");
  const { pollId } = useParams();

  const queryClient = useQueryClient();

  const { mutate: updateAffirmativeText, isPending: isAffirmativePending } =
    useMutation({
      mutationFn: editPoll,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["polls"] });
        queryClient.invalidateQueries({
          queryKey: ["polls", pollId],
        });
        toast.success(t("updateSuccess"));
      },
      onError: () => {
        toast.error(t("updateError"));
      },
    });

  const { mutate: updateNegativeText, isPending: isNegativePending } =
    useMutation({
      mutationFn: editPoll,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["polls"] });
        queryClient.invalidateQueries({
          queryKey: ["polls", pollId],
        });
        toast.success(t("updateSuccess"));
      },
      onError: () => {
        toast.error(t("updateError"));
      },
    });

  const onAffirmativeSubmit = (value: string) => {
    updateAffirmativeText({
      pollId: poll.documentId,
      poll,
      affirmativeText: value,
    });
  };

  const onNegativeSubmit = (value: string) => {
    updateNegativeText({
      pollId: poll.documentId,
      poll,
      negativeText: value,
    });
  };

  return (
    <Card className="flex flex-col justify-between h-full p-4">
      <div className="text-xl sm:text-2xl font-semibold">{t("title")}</div>
      <div className="flex flex-col gap-3.5">
        <EditAnswerOptionForm
          label={t("affirmativeOption")}
          initialValue={affirmativeOption?.text || ""}
          onSubmit={onAffirmativeSubmit}
          isPending={isAffirmativePending}
        />
        <EditAnswerOptionForm
          label={t("negativeOption")}
          initialValue={negativeOption?.text || ""}
          onSubmit={onNegativeSubmit}
          isPending={isNegativePending}
        />
      </div>
    </Card>
  );
};
