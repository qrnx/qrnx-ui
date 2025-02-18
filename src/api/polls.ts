import { TResponse } from "@/types/api";
import { TPoll } from "@/types/poll";

export type TGetPollsData = TResponse<TPoll[]>;
export type TGetPollByIdData = TResponse<TPoll>;

export const getPolls = async (): Promise<TGetPollsData> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/polls`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data.data;
};

export const getPollById = async (
  pollId: string
): Promise<TGetPollByIdData> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/polls/${pollId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  return data.data;
};
