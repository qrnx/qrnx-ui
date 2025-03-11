import { User } from "@/types/user";

export const getUser = async (): Promise<User> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return data;
};
