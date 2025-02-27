"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Error } from "../ui/error";
import { ButtonLoading } from "../ui/button-loading";
import { ChevronLeft, Save } from "lucide-react";
import { Label } from "../ui/label";

interface CreatePollProps {
  label: string;
  initialValue: string;
  onSubmit: (value: string) => void;
  isPending: boolean;
}

export const EditAnswerOptionForm = ({
  label,
  initialValue,
  onSubmit,
  isPending,
}: CreatePollProps) => {
  const validationTranslations = useTranslations("validation");

  const requiredErrorMessage = validationTranslations("required");

  const validationSchema = Yup.object().shape({
    input: Yup.string().required(requiredErrorMessage),
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        input: initialValue,
      },
      validationSchema,
      onSubmit: (values) => {
        if (isPending) return;
        if (values.input === initialValue) return;
        onSubmit(values.input);
      },
    });

  const inputErrorClassNames = "border-red-500";

  return (
    <form className="flex flex-col gap-1.5" onSubmit={handleSubmit}>
      <Label
        htmlFor="description"
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-1">
          <ChevronLeft />
          {label}
        </div>
        {touched.input && errors.input && <Error>{errors.input}</Error>}
      </Label>
      <div className="flex gap-2">
        <Input
          id="input"
          name="input"
          className={cn({
            [inputErrorClassNames]: touched.input && errors.input,
          })}
          value={values.input}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {isPending ? (
          <ButtonLoading className="w-9" />
        ) : (
          <Button
            type="submit"
            size="icon"
            disabled={values.input === initialValue}
            className="shrink-0"
          >
            <Save className="size-5" />
          </Button>
        )}
      </div>
    </form>
  );
};
