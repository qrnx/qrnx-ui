import { TResponse } from "@/types/api";
import { TPoll } from "@/types/poll";

export type TGetPollsData = TResponse<TPoll[]>;

export const getPolls = async (): Promise<TGetPollsData> => {
  const res = await fetch("/api/polls", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data.data;
};
