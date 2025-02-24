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

const createPoll = async (req: Request) => {
  const session = await authGuard(req);
  if (session instanceof NextResponse) return session;

  try {
    const { title, description, affirmativeText, negativeText } =
      await req.json();

    const { data } = await serverInstance.post("/polls", {
      data: {
        title,
        description,
        affirmativeText,
        negativeText,
      },
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
};

const deletePoll = async (req: Request) => {
  const session = await authGuard(req);
  if (session instanceof NextResponse) return session;

  try {
    const { pollId } = await req.json();
    await serverInstance.delete(`/polls/${pollId}`);
    return NextResponse.json(null, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
};

const editPoll = async (req: Request) => {
  const session = await authGuard(req);
  if (session instanceof NextResponse) return session;

  try {
    const { pollId, title, description, affirmativeText, negativeText } =
      await req.json();

    const { data } = await serverInstance.put(`/polls/${pollId}`, {
      data: {
        title,
        description,
        affirmativeText,
        negativeText,
      },
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
};

export {
  getAll as GET,
  createPoll as POST,
  deletePoll as DELETE,
  editPoll as PUT,
};
