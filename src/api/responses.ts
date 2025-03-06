import { TimeIntervals } from "@/types/timeIntervals";
import axios from "axios";

export type GetResponsesData = Response[];

export type GetResponsesParams = {
  pollId: string;
  timeInterval: TimeIntervals;
};

export const getResponses = async ({
  pollId,
  timeInterval,
}: GetResponsesParams): Promise<GetResponsesParams> => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/responses`,
    {
      params: {
        pollId,
        timeInterval,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};
