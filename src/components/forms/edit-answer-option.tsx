"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ComponentProps } from "react";
import { Error } from "../ui/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPoll } from "@/api/polls";
import { ButtonLoading } from "../ui/button-loading";
import { toast } from "sonner";
import { ChevronLeft, Save } from "lucide-react";

interface CreatePollProps extends ComponentProps<"form"> {
  onClose?: () => void;
}

export const EditAnswerOptionForm = ({ onClose }: CreatePollProps) => {
  const t = useTranslations("editAnswerOptionCard");
  const validationTranslations = useTranslations("validation");
  const queryClient = useQueryClient();

  const { mutate: updateAffirmativeText, isPending: isAffirmativePending } =
    useMutation({
      mutationFn: (affirmativeText: string) => editPoll({ affirmativeText }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["polls"] });
        toast.success(t("updateSuccess"));
      },
      onError: () => {
        toast.error(t("updateError"));
      },
    });

  const { mutate: updateNegativeText, isPending: isNegativePending } =
    useMutation({
      mutationFn: (negativeText: string) => editPoll({ negativeText }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["polls"] });
        toast.success(t("updateSuccess"));
      },
      onError: () => {
        toast.error(t("updateError"));
      },
    });

  const requiredErrorMessage = validationTranslations("required");

  const validationSchema = Yup.object().shape({
    affirmativeText: Yup.string().required(requiredErrorMessage),
    negativeText: Yup.string().required(requiredErrorMessage),
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        affirmativeText: "yes",
        negativeText: "no",
      },
      validationSchema,
      onSubmit: () => {},
    });

  return (
    <div className="flex flex-col gap-4">
      <form
        className="flex flex-col gap-1.5"
        onSubmit={(e) => {
          e.preventDefault();
          updateAffirmativeText(values.affirmativeText);
        }}
      >
        <div className="flex">
          <ChevronLeft />
          {t("affOption")}
        </div>
        <div className="flex gap-2">
          <Input
            id="affirmativeText"
            name="affirmativeText"
            value={values.affirmativeText}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.affirmativeText && errors.affirmativeText && (
            <Error>{errors.affirmativeText}</Error>
          )}
          {isAffirmativePending ? (
            <ButtonLoading />
          ) : (
            <Button type="submit" size="icon">
              <Save className="size-5" />
            </Button>
          )}
        </div>
      </form>

      <form
        className="flex flex-col gap-1.5"
        onSubmit={(e) => {
          e.preventDefault();
          updateNegativeText(values.negativeText);
        }}
      >
        <div className="flex">
          <ChevronLeft />
          {t("negOption")}
        </div>
        <div className="flex gap-2">
          <Input
            id="negativeText"
            name="negativeText"
            value={values.negativeText}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.negativeText && errors.negativeText && (
            <Error>{errors.negativeText}</Error>
          )}
          {isNegativePending ? (
            <ButtonLoading />
          ) : (
            <Button type="submit" size="icon">
              <Save className="size-5" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
