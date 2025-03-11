import { UserContext } from "@/providers/user-providers";
import { useContext } from "react";

const useGetUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export default useGetUser;
