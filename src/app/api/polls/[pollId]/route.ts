import { authGuard } from "@/lib/authGuard";
import serverInstance from "@/lib/serverInstance";
import { NextResponse } from "next/server";

const getOne = async (
  req: Request,
  { params }: { params: { pollId: string } }
) => {
  const session = await authGuard(req);
  if (session instanceof NextResponse) return session;

  const { pollId } = await params;

  try {
    const { data } = await serverInstance.get(`/polls/${pollId}`, {
      params: {
        populate: ["answerOptions"],
      },
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
};

export { getOne as GET };
