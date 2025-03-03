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

export const GetPremium = (props: EditPollProps) => {
  const { className, poll, onClose, ...otherProps } = props;

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

  const initialValues: FormValues = {
    title: "",
    description: "",
    affirmativeText: "",
    negativeText: "",
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="name">Имя:</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div>
        <label htmlFor="message">Сообщение:</label>
        <textarea id="message" name="message" required />
      </div>
      <button type="submit">Отправить</button>
    </form>
  );
};
