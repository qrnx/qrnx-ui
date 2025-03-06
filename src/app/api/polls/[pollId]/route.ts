import { authGuard } from "@/lib/authGuard";
import serverInstance from "@/lib/serverInstance";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ pollId: string }> }
) => {
  const session = await authGuard(req);
  if (session instanceof NextResponse) return session;

  const { pollId } = await params;

  try {
    const res = await serverInstance.get(`/polls/${pollId}`, {
      params: {
        populate: ["answerOptions", "responses.answerOption"],
      },
    });

    const data = res.data;
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json(axiosError, { status: axiosError.status });
  }
};
