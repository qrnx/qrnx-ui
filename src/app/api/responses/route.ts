import serverInstance, { serverWithoutInterceptor } from "@/lib/serverInstance";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { answerOptionId, pollId } = body;

    await serverWithoutInterceptor.post("/responses", {
      data: {
        poll: pollId,
        answerOption: answerOptionId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json(axiosError, { status: axiosError.status });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const pollId = searchParams.get("pollId");
    const timeInterval = searchParams.get("timeInterval");
    const isNormalized = searchParams.get("isNormalized");

    const res = await serverInstance.get("/responses", {
      params: {
        pollId: pollId,
        timeInterval,
        isNormalized,
      },
    });

    return NextResponse.json(res.data);
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json(axiosError, { status: axiosError.status });
  }
};
