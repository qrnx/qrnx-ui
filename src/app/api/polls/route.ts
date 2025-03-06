import { authGuard } from "@/lib/authGuard";
import serverInstance from "@/lib/serverInstance";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

const getAll = async (req: Request) => {
  const session = await authGuard(req);
  if (session instanceof NextResponse) return session;

  try {
    const { data } = await serverInstance.get("/polls", {
      params: {
        populate: ["answerOptions", "responses.answerOption"],
      },
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json(axiosError, { status: axiosError.status });
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

    const pollId = data.poll.documentId;

    await Promise.all([
      serverInstance.post("/answer-options", {
        data: {
          text: affirmativeText,
          type: "affirmative",
          poll: { connect: pollId },
        },
      }),
      serverInstance.post("/answer-options", {
        data: {
          text: negativeText,
          type: "negative",
          poll: { connect: pollId },
        },
      }),
    ]);

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json(axiosError, { status: axiosError.status });
  }
};

const deletePoll = async (req: Request) => {
  const session = await authGuard(req);
  if (session instanceof NextResponse) return session;

  try {
    const { pollId } = await req.json();
    await serverInstance.delete(`/polls/${pollId}`);
    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json(axiosError, { status: axiosError.status });
  }
};

const editPoll = async (req: Request) => {
  const session = await authGuard(req);
  if (session instanceof NextResponse) return session;

  try {
    const { pollId, poll, title, description, affirmativeText, negativeText } =
      await req.json();

    const filteredValues: Record<string, string> = {};

    if (title !== undefined) filteredValues.title = title;
    if (description !== undefined) filteredValues.description = description;

    if (title || description) {
      await serverInstance.put(`/polls/${pollId}`, {
        data: {
          ...filteredValues,
        },
      });
    }
    const affirmativeOption = poll.answerOptions.find(
      (option: { type: string }) => option.type === "affirmative"
    );
    const negativeOption = poll.answerOptions.find(
      (option: { type: string }) => option.type === "negative"
    );

    if (affirmativeText !== undefined) {
      await serverInstance.put(
        `/answer-options/${affirmativeOption.documentId}`,
        {
          data: {
            text: affirmativeText,
          },
        }
      );
    }

    if (negativeText !== undefined) {
      await serverInstance.put(`/answer-options/${negativeOption.documentId}`, {
        data: {
          text: negativeText,
        },
      });
    }

    return NextResponse.json({ data: {} }, { status: 200 });
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json(axiosError, { status: axiosError.status });
  }
};

export {
  getAll as GET,
  createPoll as POST,
  deletePoll as DELETE,
  editPoll as PUT,
};
