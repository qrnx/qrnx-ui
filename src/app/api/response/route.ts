import serverInstance from "@/lib/serverInstance";
import axios from "axios";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { answerOptionId, pollId } = body;

    const response = await axios.post("/responses", {
      poll: pollId,
      answerOption: answerOptionId,
    });

    return NextResponse.json({ message: "POST /api/polls" });
  } catch (error) {
    console.error("Response creating error: ", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
};
