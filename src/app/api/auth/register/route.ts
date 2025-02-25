import serverInstance from "@/lib/serverInstance";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    const response = await serverInstance.post("/auth/local/register", {
      username,
      email,
      password,
    });

    const data = response.data;

    if (response.status !== 200) {
      return NextResponse.json(
        { error: data.error || "Registration error" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, user: data.user });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Register error:", error);
    return NextResponse.json(
      { data: null, error: "Internal error" },
      { status: 500 }
    );
  }
}
