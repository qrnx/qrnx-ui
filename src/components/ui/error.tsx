"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

const errorClassNames =
  "text-sm font-medium text-red-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

export const Error = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn(errorClassNames, className)} {...props} />
);
