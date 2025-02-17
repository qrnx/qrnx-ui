import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function authGuard(req: Request, role?: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (role && session.user.role !== role) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return session;
}
