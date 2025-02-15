import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    const response = await fetch(
      `${process.env.STRAPI_API_URL}/api/auth/local/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Registration error" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, user: data.user });
  } catch (_err) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
