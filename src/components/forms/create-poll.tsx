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
import { useMutation } from "@tanstack/react-query";
import { createPoll as createPollRequest } from "@/api/polls";
import queryClient from "@/lib/queryClient";
import { ButtonLoading } from "../ui/button-loading";

interface CreatePollFormProps extends ComponentProps<"form"> {
  onClose?: () => void;
}

export const CreatePollForm = ({ className, onClose }: CreatePollFormProps) => {
  const t = useTranslations("dashboard.createPollDialog");
  const validationTranslations = useTranslations("validation");

  const { mutate: createPoll, isPending: isCreatePollPending } = useMutation({
    mutationFn: createPollRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["polls"],
      });
      if (onClose) {
        onClose();
      }
    },
  });

  const requiredErrorMessage = validationTranslations("required");

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(requiredErrorMessage),
    description: Yup.string(),
    affirmativeText: Yup.string().required(requiredErrorMessage),
    negativeText: Yup.string().required(requiredErrorMessage),
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        title: "",
        description: "",
        affirmativeText: t("affirmativePlaceholder"),
        negativeText: t("negativePlaceholder"),
      },
      validationSchema,
      onSubmit: (values) => {
        createPoll(values);
      },
    });

  const inputErrorClassNames = "border-red-500";

  return (
    <form
      className={cn("grid items-start gap-4", className)}
      onSubmit={handleSubmit}
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
      {isCreatePollPending ? (
        <ButtonLoading />
      ) : (
        <Button type="submit">{t("create")}</Button>
      )}
    </form>
  );
};
