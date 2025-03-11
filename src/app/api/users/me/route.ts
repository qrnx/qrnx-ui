import serverInstance from "@/lib/serverInstance";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const res = await serverInstance.get("/users/me");

    return NextResponse.json(res.data);
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json(axiosError, { status: axiosError.status });
  }
};
