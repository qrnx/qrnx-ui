import { Response } from "@/types/api";
import { Poll } from "@/types/poll";

export type GetPollsData = Response<Poll[]>;
export type GetPollByIdData = Response<Poll>;
export type CreatePollData = Response<Poll>;

export type GetPollByIdParams = {
  pollId: string;
};

export type CreatePollParams = {
  title: string;
  description?: string;
  affirmativeText: string;
  negativeText: string;
};

export type DeletePollParams = {
  pollId: string;
};

export const getPolls = async (): Promise<GetPollsData> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/polls`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data.data;
};

export const getPollById = async ({
  pollId,
}: GetPollByIdParams): Promise<GetPollByIdData> => {
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

export const createPoll = async (
  params: CreatePollParams
): Promise<CreatePollData> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/polls`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const data = await res.json();
  return data.data;
};

export const deletePoll = async ({
  pollId,
}: DeletePollParams): Promise<Response<null>> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/polls/${pollId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  return data;
};
