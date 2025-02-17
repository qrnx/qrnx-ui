import { authGuard } from "@/lib/authGuard";
import serverInstance from "@/lib/serverInstance";
import { NextResponse } from "next/server";

const getAll = async (req: Request) => {
  const session = await authGuard(req);
  if (session instanceof NextResponse) return session;

  try {
    const { data } = await serverInstance.get("/polls", {
      params: {
        populate: ["answerOptions"],
      },
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
};

export { getAll as GET };
