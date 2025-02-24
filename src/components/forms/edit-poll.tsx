"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useTranslations } from "next-intl";
import { Textarea } from "../ui/textarea";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ComponentProps, useMemo } from "react";
import { Error } from "../ui/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPoll as editPollRequest } from "@/api/polls";
import { ButtonLoading } from "../ui/button-loading";
import { toast } from "sonner";
import { Poll } from "@/types/poll";
import { AnswerOption } from "@/types/answerOptions";
import { useParams } from "next/navigation";

interface EditPollProps extends ComponentProps<"form"> {
  onClose?: () => void;
  poll: Poll;
}

type FormValues = {
  title: string;
  description: string;
  affirmativeText: string;
  negativeText: string;
};

export const EditPoll = (props: EditPollProps) => {
  const { className, poll, onClose, ...otherProps } = props;
  const { pollId } = useParams();
  const t = useTranslations("poll.editPollDialog");
  const validationTranslations = useTranslations("validation");
  const queryClient = useQueryClient();

  const { mutate: editPoll, isPending: isEditPollPending } = useMutation({
    mutationFn: editPollRequest,
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

      toast.success(t("updateSuccess"));
    },
  });

  const requiredErrorMessage = validationTranslations("required");

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(requiredErrorMessage),
    description: Yup.string(),
    affirmativeText: Yup.string().required(requiredErrorMessage),
    negativeText: Yup.string().required(requiredErrorMessage),
  });

  const [affirmativeOption, negativeOption] = useMemo(() => {
    const affirmativeOption = poll.answerOptions.find(
      (option) => option.type === "affirmative"
    );

    const negativeOption = poll.answerOptions.find(
      (option) => option.type === "negative"
    );

    return [affirmativeOption as AnswerOption, negativeOption as AnswerOption];
  }, [poll.answerOptions]);

  const initialValues: FormValues = {
    title: poll.title,
    description: poll.description,
    affirmativeText: affirmativeOption?.text,
    negativeText: negativeOption?.text,
  };

  const handleEditForm = (values: FormValues) => {
    const changedFields = (Object.keys(values) as (keyof FormValues)[]).reduce(
      (acc, key) => {
        if (
          JSON.stringify(values[key]) !== JSON.stringify(initialValues[key])
        ) {
          acc[key] = values[key];
        }
        return acc;
      },
      {} as Record<keyof FormValues, string>
    );

    editPoll({ pollId: poll.documentId, poll, ...changedFields });
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: handleEditForm,
    });

  const inputErrorClassNames = "border-red-500";

  return (
    <form
      className={cn("grid items-start gap-4", className)}
      onSubmit={handleSubmit}
      {...otherProps}
    >
      <div className="grid gap-2">
        <Label htmlFor="title">{t("titleLabel")}</Label>
        <Input
          id="title"
          name="title"
          className={cn({
            [inputErrorClassNames]: touched.title && errors.title,
          })}
          placeholder={t("titlePlaceholder")}
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.title && errors.title && <Error>{errors.title}</Error>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">{t("descriptionLabel")}</Label>
        <Textarea
          id="description"
          name="description"
          placeholder={t("descriptionPlaceholder")}
          className={cn(" max-h-[64px]", {
            [inputErrorClassNames]: touched.description && errors.description,
          })}
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.description && errors.description && (
          <Error>{errors.description}</Error>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="affirmativeText">{t("affirmativeLabel")}</Label>
        <Input
          id="affirmativeText"
          name="affirmativeText"
          className={cn({
            [inputErrorClassNames]:
              touched.affirmativeText && errors.affirmativeText,
          })}
          value={values.affirmativeText}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.affirmativeText && errors.affirmativeText && (
          <Error>{errors.affirmativeText}</Error>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="negativeText">{t("negativeLabel")}</Label>
        <Input
          id="negativeText"
          name="negativeText"
          className={cn({
            [inputErrorClassNames]: touched.negativeText && errors.negativeText,
          })}
          value={values.negativeText}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.negativeText && errors.negativeText && (
          <Error>{errors.negativeText}</Error>
        )}
      </div>
      {isEditPollPending ? (
        <ButtonLoading />
      ) : (
        <Button type="submit">{t("update")}</Button>
      )}
    </form>
  );
};
