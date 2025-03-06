import { TimeIntervals } from "@/types/timeIntervals";
import axios from "axios";
import { Response } from "@/types/response";

export type GetResponsesData = Response[];

export type GetResponsesParams = {
  pollId: string;
  timeInterval: TimeIntervals;
  isNormalized?: boolean;
};

export const getResponses = async ({
  pollId,
  timeInterval,
  isNormalized = false,
}: GetResponsesParams): Promise<GetResponsesData> => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/responses`,
    {
      params: {
        pollId,
        timeInterval,
        isNormalized,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};
