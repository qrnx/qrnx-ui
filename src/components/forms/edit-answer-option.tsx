"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useTranslations } from "next-intl";
import { Textarea } from "../ui/textarea";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ComponentProps } from "react";
import { Error } from "../ui/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPoll as createPollRequest } from "@/api/polls";
import { ButtonLoading } from "../ui/button-loading";
import { toast } from "sonner";
import { ChevronLeft, Save } from "lucide-react";

interface CreatePollProps extends ComponentProps<"form"> {
  onClose?: () => void;
}

export const EditAnswerOptionForm = ({ onClose }: CreatePollProps) => {
  const t = useTranslations("poll.editPollDialog");
  const validationTranslations = useTranslations("validation");
  const queryClient = useQueryClient();

  const { mutate: createPoll, isPending: isCreatePollPending } = useMutation({
    mutationFn: createPollRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["polls"],
      });
      if (onClose) {
        onClose();
      }

      toast.success("createSuccess");
    },

    onError: () => {
      toast.error("createError");
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
        negativeText: "",
      },
      validationSchema,
      onSubmit: (values) => {
        createPoll(values);
      },
    });

  return (
    <form className="flex flex-col gap-1.5" onSubmit={handleSubmit}>
      <div className="flex">
        <ChevronLeft />
        Negative option
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
        <Button type="submit" size="icon">
          <Save className="size-5" />
        </Button>
      </div>
      <div className="flex">
        <ChevronLeft />
        Negative option
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
        <Button type="submit" size="icon">
          <Save className="size-5" />
        </Button>
      </div>
    </form>
  );
};
