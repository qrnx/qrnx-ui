import serverInstance from "@/lib/serverInstance";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { answerOptionId, pollId } = body;

    await serverInstance.post("/responses", {
      data: {
        poll: pollId,
        answerOption: answerOptionId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Response creating error: ", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
};
