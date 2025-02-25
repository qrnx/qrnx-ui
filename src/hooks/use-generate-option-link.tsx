import { usePathname } from "next/navigation";
import { useCallback } from "react";

export const useGenerateOptionUrl = () => {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return useCallback(
    (optionId: string | undefined): string => {
      if (!optionId) {
        return new URL(pathname, baseUrl).toString();
      }
      return new URL(`${pathname}/${optionId}`, baseUrl).toString();
    },
    [baseUrl, pathname]
  );
};
