"use client";

import * as Yup from "yup";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useFormik } from "formik";
import { ComponentProps } from "react";
import { Error } from "../ui/error";
import { useTranslations } from "next-intl";

interface GetEmailProps extends ComponentProps<"form"> {
  onClose?: () => void;
  email?: string;
}

export const GetPremium = (props: GetEmailProps) => {
  const t = useTranslations("userNav.getPremium.getPremiumForm");
  const { className, onClose, email, ...otherProps } = props;

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Некорректный email")
      .required("Обязательное поле"),
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: email || "test@email.com",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        if (values.email === "test@email.com") return;
        if (onClose) onClose();
      },
    });

  const inputErrorClassNames = "border-red-500";

  return (
    <form
      className={cn("grid items-start gap-4", className)}
      onSubmit={handleSubmit}
      {...otherProps}
    >
      <div>
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          type="email"
          id="email"
          name="email"
          required
          className={cn({
            [inputErrorClassNames]: touched.email && errors.email,
          })}
          placeholder={"test@email.com"}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        {touched.email && errors.email && <Error>{errors.email}</Error>}
      </div>
      <Button type="submit">{t("submitButton")}</Button>
    </form>
  );
};
