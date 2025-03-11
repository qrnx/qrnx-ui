import { serverWithoutInterceptor } from "@/lib/serverInstance";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ answerOptionId: string }> }
) => {
  const { answerOptionId } = await params;

  try {
    const res = await serverWithoutInterceptor.get(
      `/answer-options/${answerOptionId}`
    );

    return NextResponse.json(res.data);
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json(axiosError, { status: axiosError.status });
  }
};
