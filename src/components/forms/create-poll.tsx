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

interface CreatePollFormProps extends ComponentProps<"form"> {
  onClose?: () => void;
}

export const CreatePollForm = ({ className, onClose }: CreatePollFormProps) => {
  const t = useTranslations("dashboard.createPollDialog");
  const validationTranslations = useTranslations("validation");

  const requiredErrorMessage = validationTranslations("required");

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(requiredErrorMessage),
    description: Yup.string(),
    affirmative: Yup.string().required(requiredErrorMessage),
    negative: Yup.string().required(requiredErrorMessage),
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        title: "",
        description: "",
        affirmative: t("affirmativePlaceholder"),
        negative: t("negativePlaceholder"),
      },
      validationSchema,

      onSubmit: (values) => {
        // eslint-disable-next-line no-console
        console.log(values);
      },
    });

  const inputErrorClassNames = "border-red-500";

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit();
    if (onClose) {
      onClose();
    }
  };

  return (
    <form
      className={cn("grid items-start gap-4", className)}
      onSubmit={handleFormSubmit}
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
        <Label htmlFor="affirmative">{t("affirmativeLabel")}</Label>
        <Input
          id="affirmative"
          name="affirmative"
          className={cn({
            [inputErrorClassNames]: touched.affirmative && errors.affirmative,
          })}
          value={values.affirmative}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.affirmative && errors.affirmative && (
          <Error>{errors.affirmative}</Error>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="negative">{t("negativeLabel")}</Label>
        <Input
          id="negative"
          name="negative"
          className={cn({
            [inputErrorClassNames]: touched.negative && errors.negative,
          })}
          value={values.negative}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.negative && errors.negative && (
          <Error>{errors.negative}</Error>
        )}
      </div>
      <Button type="submit">{t("create")}</Button>
    </form>
  );
};
